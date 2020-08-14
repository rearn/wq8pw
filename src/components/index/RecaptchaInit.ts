export default class RecaptchaInit {
  public flag = false;

  public async wait() {
    const intervalId = setInterval(() => {
      /* istanbul ignore if */
      // eslint-disable-next-line no-prototype-builtins
      if (window.hasOwnProperty('grecaptcha')) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { grecaptcha } = window as any;
        // eslint-disable-next-line no-prototype-builtins
        if (grecaptcha.hasOwnProperty('render')) {
          if (this.flag) {
            clearInterval(intervalId);
          }
        }
      }
    }, 100);
  }
}
