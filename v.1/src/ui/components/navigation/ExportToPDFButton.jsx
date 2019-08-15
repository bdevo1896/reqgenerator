import Router from 'next/router';


const ExportToPDFButton = () => (
    <button className="main-button" onClick={() => Router.push('/pdf-view')}>Export to PDF</button>
)

export default ExportToPDFButton;