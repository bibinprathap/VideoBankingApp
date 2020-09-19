package com.rnvideochat;
import android.app.AlertDialog;

import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.PermissionListener;

public class MainActivity extends ReactActivity {


  public static final int PERMISSION_REQ_CODE = 1234;
  String[] perms = { "android.permission.CAMERA", "android.permission.ACCESS_FINE_LOCATION",
          "android.permission.ACCESS_COARSE_LOCATION", "android.permission.ACCESS_NETWORK_STATE",
          "android.permission.INTERNET","android.permission.READ_PHONE_STATE" ,"android.permission.RECORD_AUDIO","android.permission.READ_EXTERNAL_STORAGE","android.permission.WRITE_EXTERNAL_STORAGE"};

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    Intent intent = new Intent(this, AppMainActivity.class);
    startActivity(intent);
    checkPerms();
    finish();
  }
  public void showAlert(String rejectedPermission) {

    AlertDialog.Builder dialog = new AlertDialog.Builder(this);
    dialog.setMessage("Please Grant All Permissions");
    dialog.setTitle("Permission Not Granted " + rejectedPermission);
    dialog.setPositiveButton("OK",
            new DialogInterface.OnClickListener() {
              public void onClick(DialogInterface dialog,
                                  int which) {
                finishAndRemoveTask();

              }
            });
    AlertDialog alertDialog = dialog.create();
    alertDialog.show();

  }
  public void checkPerms() {
    // Checking if device version > 22 and we need to use new permission model
    if (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP_MR1) {

      for (String perm : perms) {
        // Checking each persmission and if denied then requesting permissions
        if (checkSelfPermission(perm) == PackageManager.PERMISSION_DENIED) {
          requestPermissions(perms, PERMISSION_REQ_CODE, new PermissionListener() {
            @Override
            public boolean onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {

              for (int i = 0; i < grantResults.length; i++) {

                int permResult = grantResults[i];
                if (permResult == -1) {
                  String rejectedPermission = permissions[i];
                  showAlert(rejectedPermission);


                }
              }
             // Log.d("requestCode", "onRequestPermissionsResult: " + requestCode);
              return false;
            }
          });


          break;
        }
      }

    }
  }
    
}
