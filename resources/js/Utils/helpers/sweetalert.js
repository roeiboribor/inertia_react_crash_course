import Swal from "sweetalert2";

export const sweetError = ({ text = 'Something went wrong!', footer = null }) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: text,
        footer: footer
    })
};

export const sweetSuccess = ({ text = 'Success!', footer = null }) => {
    Swal.fire({
        icon: 'success',
        title: 'Yehey!',
        html: text,
        footer: footer
    })
};