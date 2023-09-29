const Loader = ({ isShow = false }) => {
    return isShow ? (
        <div className="flex items-center">
            <i class="bx bx-loader-alt animate-spin mr-2"></i> Loading...
        </div>
    ) : null;
};

export default Loader;
