// UI COMPONENTS
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Button from "@/Components/ui/buttons/Button";

// CUSTOM COMPONENT
import Loader from "@/Components/ui/loaders/Loader";

// HELPER
import { isEmpty } from "@/Utils/helpers/validation";
import { sweetError, sweetSuccess } from "@/Utils/helpers/sweetalert";

const UserModal = ({
    data,
    setData,
    post,
    put,
    destroy,
    errors,
    isOpen,
    setIsOpen,
    processing,
    modalType,
    resetModalForm,
}) => {
    const closeModal = () => {
        setIsOpen(false);
        resetModalForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        switch (modalType) {
            case "create":
                post(route("users.store"), {
                    preserveScroll: true,
                    onSuccess: () => {
                        closeModal();
                        sweetSuccess({
                            text: "You have successfully added a user",
                        });
                    },
                    onError: (error) => {
                        if (error.message) {
                            sweetError({
                                text: `<p>Something went wrong! 😅</p><p class="text-sm mt-1">${error.message}</p>`,
                            });
                        }
                    },
                });
                break;
            case "edit":
                put(route("users.update", data.id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        closeModal();
                        sweetSuccess({
                            text: "You have successfully updated a user",
                        });
                    },
                    onError: (error) => {
                        if (error.message) {
                            sweetError({
                                text: `<p>Something went wrong! 😅</p><p class="text-sm mt-1">${error.message}</p>`,
                            });
                        }
                    },
                });
                break;
            case "delete":
                destroy(route("users.destroy", data.id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        closeModal();
                        sweetSuccess({
                            text: "You have successfully deleted a user ",
                        });
                    },
                    onError: (error) => {
                        if (error.message) {
                            sweetError({
                                text: `<p>Something went wrong! 😅</p><p class="text-sm mt-1">${error.message}</p>`,
                            });
                        }
                    },
                });
                break;

            default:
                break;
        }
    };

    return (
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
    );
};
export default UserModal;
