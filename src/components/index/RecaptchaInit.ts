export default class RecaptchaInit {
  public flag = false;
  public async wait() {
    const intervalId = setInterval(() => {
      /* istanbul ignore if  */
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
