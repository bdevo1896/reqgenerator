import UseCaseAddButton from '../components/visual/UseCaseAddButton';
import ExportToJSONButton from '../components/visual/ExportToJSONButton';
import ExportToMarkDownButton from '../components/visual/ExportToMarkdownButton';
// import ExportToPDFButton from '../components/navigation/ExportToPDFButton';
import ImportDataButton from '../components/visual/ImportDataButton';

const ButtonDrawer = () => (
    <div className="o_button-drawer">
        <ExportToJSONButton />
        <ExportToMarkDownButton />
        {/* <ExportToPDFButton /> */}
        <ImportDataButton />
        <UseCaseAddButton />
        <style jsx>{`
            .o_button-drawer {
                display: grid;
                grid-auto-rows: minmax(auto,75px);
                grid-gap: 10px;
                padding: 1em;
                position: fixed;
                right: 0;
                top: 0;
            }
        `}</style>
    </div>
)

export default ButtonDrawer;