import {useState} from 'react';
import UseCaseDisplayView from './UseCaseDisplayView';
import UseCaseEditView from './UseCaseEditView';

const MODES = {
    edit: 'edit',
    view: 'view'
}

export default function UseCaseView (props) {

    const {classes,useCase,caseNum} = props;
    const {ref} = useCase;

    const [mode,setMode] = useState(MODES.view);

    return (
        <div className={`o_use-case-view ${classes}`} ref={ref}>
            {mode == MODES.view &&
                <UseCaseDisplayView 
                    useCase={useCase}
                    onEdit = {() => setMode(MODES.edit)}
                    caseNum={caseNum}
                />
            }
            {mode == MODES.edit &&
                <UseCaseEditView 
                    useCase = {useCase}
                    onSave = {() => setMode(MODES.view)}
                />
            }
            <style jsx>{`
                .o_use-case-view {
                    display: grid;
                    justify-items: center;
                    align-items: center;
                    grid-gap: 15px;
                    position: relative;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    )
}