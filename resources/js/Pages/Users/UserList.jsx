import Button from "@/Components/ui/buttons/Button";

const UserList = ({ users, handleEditModal, handleDeleteModal }) => {
    const handleClick = (e, id, type) => {
        e.preventDefault();

        switch (type) {
            case "edit":
                handleEditModal(id);
                break;
            case "delete":
                handleDeleteModal(id);
                break;

            default:
                console.log("No Button Type");
                break;
        }
    };
    return (
        <>
            {users ? (
                <ul className="space-y-2">
                    {users.map((item, index) => (
                        <li
                            key={`list-item-${index}`}
                            className="flex items-center space-x-2"
                        >
                            <span>{item.name}</span>
                            <span>{item.email}</span>
                            <Button
                                onClick={(e) => handleClick(e, item.id, "edit")}
                                type="button"
                                className="btn-primary"
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={(e) =>
                                    handleClick(e, item.id, "delete")
                                }
                                type="button"
                                className="btn-danger"
                            >
                                Delete
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No Result Found</div>
            )}
        </>
    );
};

export default UserList;
