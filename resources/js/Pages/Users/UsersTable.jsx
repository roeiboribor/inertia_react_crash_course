import Button from "@/Components/ui/buttons/Button";
import { usePage } from "@inertiajs/react";
import DataTable from "react-data-table-component";

const UsersTable = ({ handleEditModal, handleDeleteModal }) => {
    const { users } = usePage().props;

    const handleClick = (e, id, type) => {
        e.preventDefault();

        switch (type) {
            case "edit":
                handleEditModal(id, type);
                break;
            case "delete":
                handleDeleteModal(id, type);
                break;

            default:
                console.log("No Button Type");
                break;
        }
    };

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            class: `flex justify-end`,
            cell: (row) => (
                <div className="w-full flex justify-end space-x-1">
                    <Button
                        onClick={(e) => handleClick(e, row.id, "edit")}
                        type="button"
                        className="btn-primary py-1 px-2"
                    >
                        <i className="bx bx-edit"></i>
                    </Button>
                    <Button
                        onClick={(e) => handleClick(e, row.id, "delete")}
                        type="button"
                        className="btn-danger py-1 px-2"
                    >
                        <i className="bx bx-trash"></i>
                    </Button>
                </div>
            ),
        },
    ];

    const paginationComponentOptions = {
        selectAllRowsItem: true,
    };

    return (
        <DataTable
            columns={columns}
            data={users}
            pagination
            paginationRowsPerPageOptions={[10, 25, 50]}
            paginationComponentOptions={paginationComponentOptions}
        />
    );
};

export default UsersTable;
