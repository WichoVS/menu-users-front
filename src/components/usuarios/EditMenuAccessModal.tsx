type EditMenuAccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: UpdateMenuAccessRequest) => void;
  user: User;
};
