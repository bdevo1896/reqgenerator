import {useState} from 'react';

function readTextFile(file,callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET",file,true);
    rawFile.onreadystatechange = function() {
        if(rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

export default function ImportDataForm({importData,isVisible}) {

    const [file,setFile] = useState(null);

    return (
        <form className={`o_file-import-form p-m-all dp10 ${isVisible ? 'show' : 'hide'}`}>
            <input className="m-s-all" type="file" accept=".json" onChange={(event) => {
                const file = event.target.files[0];
                readTextFile(file,setFile);
                // const fetchJSON = fetch(file.name)
                //     .then(res => res.json())
                //     .then(json => {
                //         console.log('here',json);
                //         const newJSON = JSON.parse(json);
                //         setFile(newJSON);
                //     })
                // const newJSON = JSON.parse(event.target.files[0]);
                // console.log(event.target.files[0]);
                // setFile(newJSON);
            }}/>
            <button className="main-button" onClick={() => importData(file)}>Import</button>
            <style jsx>{`
                .o_file-import-form {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    background: white;
                    pointer-events: none;
                    display: flex;
                    flex-flow: column nowrap;
                    
                }

                .o_file-import-form.hide {
                    opacity: 0;
                    transform: translateY(-30px);
                    transition: transform,opacity 250ms ease-in-out;
                }

                .o_file-import-form.show {
                    pointer-events: auto;
                    opacity: 1;
                    transform: translateY(30px);
                    transition: transform,opacity 250ms ease-in-out;
                }
            `}</style>
        </form>
    )
}