export default (ctx, inject) => {
  const icons = {
    info: "far fa-question-circle",
    success: "far fa-check-circle",
    failed: "far fa-times-circle",
    warning: "fas fa-exclamation-triangle",
    loading: "fas fa-circle-notch fa-spin",
  };

  const getIcon = (type) => {
    return icons[type];
  };

  const show = (_options = {}, iconType = "question") => {
    const defaultOptions = {
      title: "title",
      content: "content",
      type: "red",
      theme: "material",
      icon: getIcon(iconType),
      backgroundDismissAnimation: "none",
      columnClass: "col-lg-6",
      animationSpeed: 500,
      bgOpacity: 0,
      buttons: {
        close: {
          text: "close",
          btnClass: "btn-danger",
          keys: ["enter"],
        },
      },
    };

    const options = {
      ...defaultOptions,
      ..._options,
    };

    options.title = options.title.toUpperCase();

    return $.alert(options);
  };

  const removeInstances = () => {
    for (const instance of jconfirm.instances) {
      instance.close();
    }
  };

  const popoverFn = {
    show,
    getIcon,
    removeInstances,
  };

  inject("popover", popoverFn);
};
