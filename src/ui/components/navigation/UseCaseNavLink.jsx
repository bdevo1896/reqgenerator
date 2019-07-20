const UseCaseNavLink = ({text,useCaseRef,caseNum}) => (
    <li>
        <a className="o_use-case-link" onClick={() =>  useCaseRef.current.scrollIntoView({behavior: 'smooth'})}>UC{caseNum < 10 ? `0${caseNum}`:`${caseNum}`}: {text}</a>
        <style jsx>{`
            a {
                color: darkblue;
                cursor: pointer;
                transition: opacity 150ms ease-in-out;
            }

            a:hover {
                opacity: .5;
                transition: opacity 150ms ease-in-out;
            }
        `}</style>
    </li>
)

export default UseCaseNavLink;