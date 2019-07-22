import {useState} from 'react';

function readTextFile(file,callback) {
    const reader = new FileReader();
    reader.onload = function(){
        const text = reader.result;
        callback(text);
    };
    reader.readAsText(file);
}

export default function ImportDataForm({importData,isVisible,closeForm}) {

    const [file,setFile] = useState(null);

    return (
        <div id="import-form-container" className={`dp10 ${isVisible ? 'show' : 'hide'}`}>
        <form className="o_file-import-form p-xl-all">
            <input className="m-s-all" type="file" accept=".json" onChange={(event) => {
                const file = event.target.files[0];
                const newJSON = readTextFile(file,setFile);
                setFile(newJSON);
            }}/>
            <button className="main-button" onClick={(e) => {
                e.preventDefault();
                importData(file);
            }}>Import</button>
            <div className="close-button"><span className="close" onClick={() => closeForm()}></span></div>
        </form>
        <style jsx>{`
                #import-form-container {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    background: white;
                    pointer-events: none;
                    
                }

                #import-form-container.hide {
                    opacity: 0;
                    transition: opacity 250ms ease-in-out;
                }

                #import-form-container.show {
                    pointer-events: auto;
                    opacity: 1;
                    transition: opacity 250ms ease-in-out;
                }

                .o_file-import-form {
                    display: flex;
                    flex-flow: column nowrap;
                    position: relative;
                }

                .close-button {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                }

                .close {
                    position: relative;
                    display: inline-block;
                    width: 50px;
                    height: 50px;
                    overflow: hidden;
                }

                .close:hover::before, .close:hover::after {
                    background: #6442ff;
                }

                .close::before, .close::after {
                    content: '';
                    position: absolute;
                    height: 2px;
                    width: 100%;
                    top: 50%;
                    left: 0;
                    margin-top: -1px;
                    background: #000;
                }
                .close::before {
                transform: rotate(45deg);
                }
                .close::after {
                transform: rotate(-45deg);
                }
            `}</style>
        </div>
    )
}