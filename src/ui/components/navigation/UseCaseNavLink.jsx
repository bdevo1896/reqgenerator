const UseCaseNavLink = ({text,ref}) => (
    <li>
        <a className="o_use-case-link" onClick={() =>  ref.current.scrollIntoView({behavior: 'smooth'})}>{text}</a>
    </li>
)

export default UseCaseNavLink;