export default class alertsHelper {
  static alertDefaultNew;
  static alertDefaultModalNew;
  static onClose;

  static setAlertProviderNew(provider) {
    this.alertDefaultNew = provider;
  }

  static setAlertProviderModalNew(provider) {
    this.alertDefaultModalNew = provider;
  }
  static showAlert(title, message) {
    if (!this.alertDefaultNew && !this.alertDefaultModalNew) return;
    (this.alertDefaultModalNew || this.alertDefaultNew).alertWithType({
      show: true,
      title,
      message,
      showProgress: true,
      autoHide: false,
      showCancelIcon: false,
      showCancelButton: false,
      showConfirmButton: false,
    });
  }

  static hideAlert() {
    if (!this.alertDefaultNew && !this.alertDefaultModalNew) return;
    (this.alertDefaultModalNew || this.alertDefaultNew).alertWithType({
      show: false,
    });
  }

  static show(type, title, message, delay = false) {
    if (!this.alertDefaultNew && !this.alertDefaultModalNew) return;
    if (delay) {
      setTimeout(() => {
        (this.alertDefaultModalNew || this.alertDefaultNew).alertWithType({
          show: true,
          type,
          title,
          message,
          autoHide: true,
          showCancelIcon: true,
          showCancelButton: false,
          showConfirmButton: false,
          delay,
        });
      }, 200);
    } else {
      (this.alertDefaultModalNew || this.alertDefaultNew).alertWithType({
        show: true,
        type,
        title,
        message,
        autoHide: true,
        showCancelIcon: true,
        showCancelButton: false,
        showConfirmButton: false,
      });
    }
  }

  static showConfirm(params) {
    if (!this.alertDefaultNew && !this.alertDefaultModalNew) return;
    if (params.delay) {
      setTimeout(() => {
        (this.alertDefaultModalNew || this.alertDefaultNew).alertWithType(
          params,
        );
      }, 200);
    } else {
      (this.alertDefaultModalNew || this.alertDefaultNew).alertWithType(params);
    }
  }

  static invokeOnClose() {
    // store.dispatch(setAlert(null));
    if (typeof this.onClose === 'function') {
      (this.alertDefaultModalNew || this.alertDefaultNew).alertWithType({
        show: false,
      });
    }
  }
}
