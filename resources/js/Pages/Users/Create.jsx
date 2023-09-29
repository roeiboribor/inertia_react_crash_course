import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

import { useForm } from "@inertiajs/react";

const Create = ({ submit }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
    });

    return (
        <form onSubmit={submit} className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
                <InputLabel htmlFor="name" value="Name" required />
                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                    className="mt-1 block w-full"
                    required
                    maxLength="255"
                />
                <InputError message={errors.name} className="mt-2" />
            </div>
        </form>
    );
};

export default Create;
