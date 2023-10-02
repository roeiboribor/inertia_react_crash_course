import { useState } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { useForm, Head } from "@inertiajs/react";

// UI COMPONENTS
import Button from "@/Components/ui/buttons/Button";

// CUSTOM COMPONENTS
import UserList from "./UserList";
import UserModal from "./UserModal";
import UsersTable from "./UsersTable";

const Index = ({ auth }) => {
    let [isOpen, setIsOpen] = useState(false);
    let [modalType, setModalType] = useState("");

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        clearErrors,
        reset,
    } = useForm({
        id: "",
        name: "",
        email: "",
    });

    const openModal = () => {
        setIsOpen(true);
    };

    const handleCreateModal = () => {
        setModalType("create");
        openModal();
    };

    const handleEditModal = async (id, type) => {
        if (id) {
            setModalType(type);

            await axios
                .get(route("api.users.edit", id))
                .then(({ data }) => setData({ ...data.user }))
                .catch((error) => console.log(error));

            openModal();
        }
    };

    const handleDeleteModal = async (id, type) => {
        if (id) {
            setModalType(type);
            setData({ id: id });
            openModal();
        }
    };

    const resetModalForm = () => {
        clearErrors();
        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="card-header px-6 pt-4 pb-4 border-b">
                            <div className="flex items-end justify-between">
                                <h4 className="text-lg font-bold">User List</h4>
                                <div>
                                    <Button
                                        type="button"
                                        className="btn-success"
                                        onClick={handleCreateModal}
                                    >
                                        <i
                                            x-cloak="true"
                                            className="bx bx-plus mr-2"
                                        ></i>{" "}
                                        ADD
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 text-gray-900">
                            {/* <UserList
                                users={users}
                                handleEditModal={handleEditModal}
                                handleDeleteModal={handleDeleteModal}
                            /> */}
                            <UsersTable
                                handleEditModal={handleEditModal}
                                handleDeleteModal={handleDeleteModal}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* MODALS HERE */}
            <UserModal
                data={data}
                setData={setData}
                post={post}
                put={put}
                destroy={destroy}
                errors={errors}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                processing={processing}
                modalType={modalType}
                resetModalForm={resetModalForm}
            />
        </AuthenticatedLayout>
    );
};

export default Index;
