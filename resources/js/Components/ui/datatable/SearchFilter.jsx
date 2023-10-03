import TextInput from "@/Components/TextInput";

const SearchFilter = ({ filterText, onFilter, onClear }) => (
    <div className="search-box-container relative">
        <TextInput
            id="search"
            type="text"
            placeholder="search here..."
            value={filterText}
            onChange={onFilter}
            className="search-input py-1 pr-8"
        />
        <button
            onClick={onClear}
            className={`${
                filterText ? "" : "hidden"
            } search-btn-clear absolute top-1/2 -translate-y-1/2 right-3 flex items-center`}
        >
            <i className="bx bx-x text-sm"></i>
        </button>
    </div>
);

export default SearchFilter;
