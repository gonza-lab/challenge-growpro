import Swal from 'sweetalert2';

interface ShowModal {
  title: string;
  callback: () => any;
}

const showModal = ({ title, callback }: ShowModal) => {
  Swal.fire({
    title,
    showDenyButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: `No`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Purchased!', '', 'success');
      callback();
    }
  });
};

export default showModal;
