const UserList = ({ users }) => {
    return (
        <>
            {users ? (
                <ul>
                    {users.map((item) => (
                        <li>{item.name}</li>
                    ))}
                </ul>
            ) : (
                <div>No Result Found</div>
            )}
        </>
    );
};

export default UserList;
