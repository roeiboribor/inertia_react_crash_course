import Swal from "sweetalert2";

export const sweetError = ({ text = 'Something went wrong!', footer = null }) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: text,
        footer: footer,
        timer: 1500
    })
};

export const sweetSuccess = ({ text = 'Success!', footer = null }) => {
    Swal.fire({
        icon: 'success',
        title: 'Yehey!',
        html: text,
        footer: footer,
        timer: 1500
    })
};