package com.rama_wholesale;

import android.os.Bundle; // here 
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // here 
// import com.cboy.rn.splashscreen.SplashScreen; // here 

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    SplashScreen.show(this);  // here 
    return "rama_wholesale";
  }
}
