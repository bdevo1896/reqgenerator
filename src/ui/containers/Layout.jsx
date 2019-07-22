function Layout(props) {

    return (
        <div id="wrapper">
            <main>
                {props.children}
            </main>
            <style global jsx>{`
                body,html {
                    padding: 0;
                    margin: 0;
                    overflow: hidden;
                }
                main {
                    display: grid;
                    grid-template-columns: 2fr 9fr;
                    width: 100vw;
                    height: 100vh;
                    overflow: hidden;
                    flex-grow: 0;
                }
            `}</style>
        </div>
    )
}

export default Layout;