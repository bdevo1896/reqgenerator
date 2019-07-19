const UseCaseNavLink = ({text,useCaseRef}) => (
    <li>
        <a className="o_use-case-link" onClick={() =>  useCaseRef.current.scrollIntoView({behavior: 'smooth'})}>{text}</a>
    </li>
)

export default UseCaseNavLink;