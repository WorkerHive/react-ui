import React from 'react';

import moment from 'moment';
import Board from '@lourenci/react-kanban'
import { TeamCircles } from '../team-circles';

import '@lourenci/react-kanban/dist/styles.css'
import styles from './styles.module.css';


export interface GraphKanbanProps{
  graph: any;
  template: any;
  selfish?: boolean;
  onClick?: (e: any) => void;
  onStatusChange?: Function;
  onChange?: Function;
  user?: any;
}

export const GraphKanban : React.FC<GraphKanbanProps> = (props) => {
    const [ columns, setColumns ] = React.useState([
        {
            id: 0,
            title: 'Blocked',
            cards: []
        },
        {
            id: 1,
            title: 'Backlog',
            cards: props.graph.nodes.filter((a) => a.status != "COMPLETED" && a.status != "BLOCKED").map((x) => ({
                id: x.id,
                title: x.data.label,
            }))
        },
        {
            id: 2,
            title: 'Doing',
            cards: []
        },
        {
            id: 3,
            title: 'Done',
            cards: []
        }
    ])

    const getColumns = () => {
        let template = []
        if(props.template){
            template = props.template || [];
        }

        return template.map((col : any) => {
            let col_id = col.id;

            let cards = [];
            if(col.status){
                cards = props.graph.nodes.filter((a) => {
                    return a.data.status == col.status
                }) || []
            }else if(typeof(col.numParents) == "number"){
                cards = props.graph.nodes.filter((node) => {
                    return props.graph.links.filter((link) => link.target == node.id).length <= col.numParents
                }) || []
            }

            return {
                ...col,
                cards: cards.filter((a : any) => {
                    if(!props.selfish) return true;
                    if(props.selfish) return (a.members || []).indexOf(props.user.id) > -1
                  }).sort((a : any, b : any) => {

                    if(!(a.data && a.data.dueDate)) a.data.dueDate = Infinity;
                    if(!(b.data && b.data.dueDate)) b.data.dueDate = Infinity

                    return a.data.dueDate - b.data.dueDate
                }).map((x : any) => {
                    let parents = props.graph.links.filter((a) => a.target == x.id).map((y) => props.graph.nodes.filter((a) => a.id == y.source)[0])
return {
                    ...x,
                    title: x.data.label,
                    description: parents.length > 0 && parents[0].data.label,
}
                })
            }
        })
    }


    return (
        <Board
            renderCard={(card) => {
                return (
                    <div onClick={() => {
                        if(props.onClick){
                            props.onClick(card)
                        }
                    }} className="react-kanban-card">
                        <div className="react-kanban-card__title">
                            {card.title}

                        </div>
                        {card.data.dueDate != Infinity && <div style={{textAlign: 'left'}}>
                                ETA: {moment(new Date(card.data.dueDate * 1000)).format('DD/MM/yyyy')}
                            </div>}
                        <div>
                            {card.description}
                        </div>
                        <TeamCircles members={(!Array.isArray(card.members) && typeof(card.members) == "object") ? [] : card.members || []} />

                    </div>
                )
            }}
            onCardDragEnd={(card, source, destination) => {
                console.log(source, destination)
                let cols = columns.slice()

                let fromIx = cols.map((x) => x.id).indexOf(source.fromColumnId);
                let toIx = cols.map((x) => x.id).indexOf(destination.toColumnId)

                let spliced = cols[fromIx].cards.splice(source.fromPosition, 1)
                cols[toIx].cards.splice(destination.toPosition, 0, spliced[0])


                if(props.onStatusChange) props.onStatusChange(card, props.template.filter((a) => a.id == destination.toColumnId)[0].status)
                if(props.onChange)props.onChange(cols)
                setColumns(cols)
            }}
            onColumnDragEnd={(obj, source, destination) => {
                let cols = columns.slice()

                let spliced = cols.splice(source.fromPosition, 1)[0]
                cols.splice(destination.toPosition, 0, spliced)
                if(props.onChange)props.onChange(cols)
                setColumns(cols)
            }}
            children={{columns: getColumns()}} />
    )
}