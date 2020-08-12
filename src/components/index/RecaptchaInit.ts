export default class RecaptchaInit {
  public flag = false;
  public async wait() {
    const intervalId = setInterval(() => {
      if (window.hasOwnProperty('grecaptcha')) {
        if ((window as any).grecaptcha.hasOwnProperty('render')) {
          if (this.flag) {
            clearInterval(intervalId);
            return;
          }
        }
      }
    }, 100);
  }
}
