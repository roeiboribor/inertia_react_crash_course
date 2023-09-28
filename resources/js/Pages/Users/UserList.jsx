const UserList = ({ users }) => {
    return (
        <>
            {users ? (
                <ul>
                    {users.map((item, index) => (
                        <li key={`list-item-${index}`}>{item.name}</li>
                    ))}
                </ul>
            ) : (
                <div>No Result Found</div>
            )}
        </>
    );
};

export default UserList;
