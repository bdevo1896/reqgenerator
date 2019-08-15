import Router from 'next/router';
import UseCaseDocument from './ui/components/pdf/UseCaseDocument';
import {useRef,Component} from 'react';
import ReactToPrint from 'react-to-print';

class Document extends Component {
    render() {
        return (
            // <UseCaseDocument 
            // companyName="Rift"
            // />
            <div>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        )
    }
}

const PDFView = () => {
    const componentRef = useRef();
    return (
    <div id="pdf-view" className="p-xl-all">
        <Document ref={componentRef}/>
         <div className="print-buttons">
            <button className="sec-button m-s-right dp6 dpRaiseOnHover-3-8" onClick={() => Router.push('/')}>Go Back</button>
            <ReactToPrint
                trigger={() => <button className="main-button dp6">Print Now</button>}
                content={() => componentRef.current}
            />
        </div>
        <style jsx>{`
            .print-buttons {
                position: fixed;
                top: 0px;
                left: 0px;
                display: flex;
                flex-flow: row nowrap;
                background: rgba(255,255,255,0.7);
                width: 100%;
                border-bottom: 1px solid lightgray;
            }

            #pdf-view {
                overflow-y: scroll;
                width: 100%;
                grid-column: 1 / 3;
                background-color: #cccc;
            }
        `}</style>
    </div>
    )
}

export default PDFView;