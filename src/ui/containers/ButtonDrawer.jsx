import UseCaseAddButton from '../components/visual/UseCaseAddButton';
import ExportToJSONButton from '../components/visual/ExportToJSONButton';
import ExportToMarkDownButton from '../components/visual/ExportToMarkdownButton';
import ExportToPDFButton from '../components/navigation/ExportToPDFButton';

const ButtonDrawer = () => (
    <div className="o_button-drawer">
        <UseCaseAddButton />
        <ExportToJSONButton />
        <ExportToMarkDownButton />
        {/* <ExportToPDFButton /> */}
        <style jsx>{`
            .o_button-drawer {
                display: grid;
                grid-auto-rows: minmax(auto,75px);
                grid-gap: 10px;
                padding: 1em;
                position: fixed;
                right: 0;
                bottom: 20px;
            }
        `}</style>
    </div>
)

export default ButtonDrawer;