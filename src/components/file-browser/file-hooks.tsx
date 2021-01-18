import {useMemo, useCallback, useRef, useEffect, useState} from 'react'
import { ChonkyActions, FileHelper } from 'chonky'

const prepareCustomFileMap = () => {
    return {
        baseFileMap: {},
        rootFolderId: ""
    }
}

export const useCustomFileMap = () => {
    const { baseFileMap, rootFolderId } = useMemo(prepareCustomFileMap, []);

    // Setup the React state for our file map and the current folder.
    const [fileMap, setFileMap] = useState(baseFileMap);
    const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);

    // Setup the function used to reset our file map to its initial value. Note that
    // here and below we will always use `useCallback` hook for our functions - this is
    // a crucial React performance optimization, read more about it here:
    // https://reactjs.org/docs/hooks-reference.html#usecallback
    const resetFileMap = useCallback(() => {
        setFileMap(baseFileMap);
        setCurrentFolderId(rootFolderId);
    }, [baseFileMap, rootFolderId]);

    // Setup logic to listen to changes in current folder ID without having to update
    // `useCallback` hooks. Read more about it here:
    // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
    const currentFolderIdRef = useRef(currentFolderId);
    useEffect(() => {
        currentFolderIdRef.current = currentFolderId;
    }, [currentFolderId]);

    // Function that will be called when user deletes files either using the toolbar
    // button or `Delete` key.
    const deleteFiles = useCallback((files) => {
        // We use the so-called "functional update" to set the new file map. This
        // lets us access the current file map value without having to track it
        // explicitly. Read more about it here:
        // https://reactjs.org/docs/hooks-reference.html#functional-updates
        setFileMap((currentFileMap) => {
            // Create a copy of the file map to make sure we don't mutate it.
            const newFileMap = { ...currentFileMap };

            files.forEach((file) => {
                // Delete file from the file map.
                delete newFileMap[file.id];

                // Update the parent folder to make sure it doesn't try to load the
                // file we just deleted.
                if (file.parentId) {
                    const parent = newFileMap[file.parentId];
                    const newChildrenIds = parent.childrenIds.filter(
                        (id) => id !== file.id
                    );
                    newFileMap[file.parentId] = {
                        ...parent,
                        childrenIds: newChildrenIds,
                        childrenCount: newChildrenIds.length,
                    };
                }
            });

            return newFileMap;
        });
    }, []);

    // Function that will be called when files are moved from one folder to another
    // using drag & drop.
    const moveFiles = useCallback(
        (
            files,
            source,
            destination
        ) => {
            setFileMap((currentFileMap) => {
                const newFileMap = { ...currentFileMap };
                const moveFileIds = new Set(files.map((f) => f.id));

                // Delete files from their source folder.
                const newSourceChildrenIds = source.childrenIds.filter(
                    (id) => !moveFileIds.has(id)
                );
                newFileMap[source.id] = {
                    ...source,
                    childrenIds: newSourceChildrenIds,
                    childrenCount: newSourceChildrenIds.length,
                };

                // Add the files to their destination folder.
                const newDestinationChildrenIds = [
                    ...destination.childrenIds,
                    ...files.map((f) => f.id),
                ];
                newFileMap[destination.id] = {
                    ...destination,
                    childrenIds: newDestinationChildrenIds,
                    childrenCount: newDestinationChildrenIds.length,
                };

                // Finally, update the parent folder ID on the files from source folder
                // ID to the destination folder ID.
                files.forEach((file) => {
                    newFileMap[file.id] = {
                        ...file,
                        parentId: destination.id,
                    };
                });

                return newFileMap;
            });
        },
        []
    );

    // Function that will be called when user creates a new folder using the toolbar
    // button. That that we use incremental integer IDs for new folder, but this is
    // not a good practice in production! Instead, you should use something like UUIDs
    // or MD5 hashes for file paths.
    const idCounter = useRef(0);
    const createFolder = useCallback((folderName) => {
        setFileMap((currentFileMap) => {
            const newFileMap = { ...currentFileMap };

            // Create the new folder
            const newFolderId = `new-folder-${idCounter.current++}`;
            newFileMap[newFolderId] = {
                id: newFolderId,
                name: folderName,
                isDir: true,
                modDate: new Date(),
                parentId: currentFolderIdRef.current,
                childrenIds: [],
                childrenCount: 0,
            };

            // Update parent folder to reference the new folder.
            const parent = newFileMap[currentFolderIdRef.current];
            newFileMap[currentFolderIdRef.current] = {
                ...parent,
                childrenIds: [...parent.childrenIds, newFolderId],
            };

            return newFileMap;
        });
    }, []);

    return {
        fileMap,
        currentFolderId,
        setCurrentFolderId,
        resetFileMap,
        deleteFiles,
        moveFiles,
        createFolder,
    };
};

export const useFiles = (
    fileMap,
    currentFolderId
) => {
    return useMemo(() => {
        const currentFolder = fileMap[currentFolderId];
        const childrenIds = currentFolder.childrenIds;
        const files = childrenIds.map((fileId) => fileMap[fileId]);
        return files;
    }, [currentFolderId, fileMap]);
};

export const useFolderChain = (
    fileMap,
    currentFolderId
) => {
    return useMemo(() => {
        const currentFolder = fileMap[currentFolderId];

        const folderChain = [currentFolder];

        let parentId = currentFolder.parentId;
        while (parentId) {
            const parentFile = fileMap[parentId];
            if (parentFile) {
                folderChain.unshift(parentFile);
                parentId = parentFile.parentId;
            } else {
                break;
            }
        }

        return folderChain;
    }, [currentFolderId, fileMap]);
};

export const useFileActionHandler = (
    setCurrentFolderId,
    deleteFiles,
    moveFiles,
    createFolder
) => {
    return useCallback(
        (data) => {
            if (data.id === ChonkyActions.OpenFiles.id) {
                const { targetFile, files } = data.payload;
                const fileToOpen = targetFile ?? files[0];
                if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
                    setCurrentFolderId(fileToOpen.id);
                    return;
                }
            } else if (data.id === ChonkyActions.DeleteFiles.id) {
                deleteFiles(data.state.selectedFilesForAction);
            } else if (data.id === ChonkyActions.MoveFiles.id) {
                moveFiles(
                    data.payload.files,
                    data.payload.source,
                    data.payload.destination
                );
            } else if (data.id === ChonkyActions.CreateFolder.id) {
                const folderName = prompt('Provide the name for your new folder:');
                if (folderName) createFolder(folderName);
            }

        },
        [createFolder, deleteFiles, moveFiles, setCurrentFolderId]
    );
};
