import { useState } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { usePage, useForm, Head } from "@inertiajs/react";

// UI COMPONENTS
import Button from "@/Components/ui/buttons/Button";

// CUSTOM COMPONENTS
import UserList from "./UserList";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

// HELPER
import { isEmpty } from "@/Utils/helpers/validation";
import Loader from "@/Components/ui/loaders/Loader";

const Index = ({ auth }) => {
    let [isOpen, setIsOpen] = useState(false);
    let [modalType, setModalType] = useState("");

    const { users } = usePage().props;

    const {
        data,
        setData,
        get,
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

    const closeModal = () => {
        setIsOpen(false);
        resetModalForm();
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        switch (modalType) {
            case "create":
                post(route("users.store"), {
                    preserveScroll: true,
                    onSuccess: () => {
                        closeModal();
                    },
                });
                break;
            case "edit":
                put(route("users.update", data.id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        closeModal();
                    },
                });
                break;
            case "delete":
                destroy(route("users.destroy", data.id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        closeModal();
                    },
                });
                break;

            default:
                break;
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
                                <div>Kineme</div>
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
                            <UserList
                                users={users}
                                handleEditModal={handleEditModal}
                                handleDeleteModal={handleDeleteModal}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* MODALS HERE */}
            <Modal show={isOpen} closeable={true} maxWidth="xl">
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="card-title relative">
                        <h3 className="text-xl font-bold">
                            {modalType == "create"
                                ? "Add"
                                : modalType == "edit"
                                ? "Edit"
                                : modalType == "delete"
                                ? "Delete"
                                : null}{" "}
                            User
                        </h3>
                        <span
                            onClick={closeModal}
                            className="absolute top-0 right-0 cursor-pointer"
                        >
                            <i className="bx bx-x text-xl text-red-500 font-semibold"></i>
                        </span>
                    </div>
                    <div className="card-body py-8">
                        {modalType === "delete" ? (
                            <div>
                                <p className="text-center">
                                    Are you sure you want to delete this user?
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12">
                                    <InputLabel
                                        htmlFor="name"
                                        value="Name"
                                        required
                                    />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                        required={true}
                                        maxLength="255"
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="col-span-12">
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email"
                                        required
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                        required={true}
                                        maxLength="255"
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="card-footer">
                        <div className="flex items-center justify-between">
                            <div>
                                <Loader isShow={processing} />
                            </div>
                            <div className="flex space-x-2">
                                {modalType === "delete" ? (
                                    <Button
                                        type="submit"
                                        className="btn-danger"
                                        onClick={handleSubmit}
                                    >
                                        Delete
                                    </Button>
                                ) : (
                                    <Button
                                        disabled={
                                            isEmpty(data.name) ||
                                            isEmpty(data.email) ||
                                            processing
                                        }
                                        type="submit"
                                        className="btn-success"
                                        onClick={handleSubmit}
                                    >
                                        Save
                                    </Button>
                                )}
                                <Button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;
