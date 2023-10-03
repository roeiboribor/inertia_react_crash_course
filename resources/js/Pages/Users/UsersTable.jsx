import Button from "@/Components/ui/buttons/Button";
import SearchFilter from "@/Components/ui/datatable/SearchFilter";

import { usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

import DataTable from "react-data-table-component";

const UsersTable = ({ handleEditModal, handleDeleteModal }) => {
    const { users } = usePage().props;

    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

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

    const filteredItems = users.filter(
        (item) =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <div className="absolute w-full flex items-end justify-between px-4">
                <SearchFilter
                    onFilter={(e) => setFilterText(e.target.value)}
                    onClear={handleClear}
                    filterText={filterText}
                />
                <div>Kineme</div>
            </div>
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            striped
            subHeader
            subHeaderAlign="center"
            subHeaderComponent={subHeaderComponent}
            paginationRowsPerPageOptions={[10, 25, 50]}
            paginationComponentOptions={paginationComponentOptions}
        />
    );
};

export default UsersTable;
