package com.rnvideochat.scantext;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.hardware.Camera;
import android.os.Bundle;
import androidx.annotation.NonNull;
// import android.support.design.widget.Snackbar;
import androidx.annotation.RequiresPermission;
import androidx.core.app.ActivityCompat;
import androidx.appcompat.app.AppCompatActivity;
import android.util.Log;
import android.widget.FrameLayout;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.ScaleGestureDetector;
import android.view.View;
import android.widget.Toast;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.Arguments;
import android.view.ViewGroup;

import android.util.SparseArray;

import com.rnvideochat.scantext.CameraSource;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.common.api.CommonStatusCodes;
import com.rnvideochat.scantext.CameraSourcePreview;
import com.rnvideochat.scantext.GraphicOverlay;
import com.google.android.gms.vision.text.TextBlock;
import com.google.android.gms.vision.Detector;
import com.google.android.gms.vision.text.TextRecognizer;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import java.io.IOException;
import com.facebook.react.bridge.WritableMap;

public final class ScanTextView extends FrameLayout {
    private static final String TAG = "ScanTextView";

    // Intent request code to handle updating play services if needed.
    private static final int RC_HANDLE_GMS = 9001;

    // Permission request codes need to be < 256
    private static final int RC_HANDLE_CAMERA_PERM = 2;

    // Constants used to pass extra data in the intent
    public static final String AutoFocus = "AutoFocus";
    public static final String UseFlash = "UseFlash";
    public static   boolean startFlash =  false;
    public static final String TextBlockObject = "String";

    private CameraSource mCameraSource;
    private CameraSourcePreview mPreview;
    private GraphicOverlay<OcrGraphic> mGraphicOverlay;
    private TextRecognizer textRecognizer;
    private Detector.Detections<TextBlock> mDetections;

    // // Helper objects for detecting taps and pinches.
    // private ScaleGestureDetector scaleGestureDetector;
    // private GestureDetector gestureDetector;
    /**
     * save the signature to an sd card directory
     */
    final void saveImage() {
        try {
            StringBuilder stringBuilder = new StringBuilder();
            for ( OcrGraphic graphic : mGraphicOverlay.mGraphics) {
                TextBlock text = null;
                if (graphic != null) {
                    text = graphic.getTextBlock();
                    if (text != null && text.getValue() != null) {
                        stringBuilder.append(text.getValue());
                        stringBuilder.append("\n");
                    }
                    else {
                        Log.d(TAG, "text data is null");
                    }
                }
            }
            WritableMap event = Arguments.createMap();
            event.putString("text", stringBuilder.toString());
            //  event.putString("textblock", encoded);
            ReactContext reactContext = (ReactContext) getContext();
            reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "topChange", event);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    final void saveId(String value) {
        try {

            WritableMap event = Arguments.createMap();
            event.putString("text", value);
            //  event.putString("textblock", encoded);
            ReactContext reactContext = (ReactContext) getContext();
            reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "topChange", event);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public ScanTextView(Context context,boolean useFlash) {
        super(context);
        mPreview = new CameraSourcePreview(context);
        mGraphicOverlay = new  GraphicOverlay<OcrGraphic>(context);
        startFlash = useFlash;

        // Snackbar.make(mGraphicOverlay, "Tap to capture. Pinch/Stretch to zoom",
        //         Snackbar.LENGTH_LONG)
        //         .show();

        boolean autoFocus =true;

        createCameraSource(autoFocus, useFlash,context);
        // Check for the camera permission before accessing the camera.  If the
        // permission is not granted yet, request permission.
        // int rc = ActivityCompat.checkSelfPermission(this, Manifest.permission.CAMERA);
        // if (rc == PackageManager.PERMISSION_GRANTED) {

        // } else {
        //     requestCameraPermission();
        // }

        // gestureDetector = new GestureDetector(this, new CaptureGestureListener());
        // scaleGestureDetector = new ScaleGestureDetector(this, new ScaleListener());
        this.addView(mPreview);
        this.addView(mGraphicOverlay);
    }

    /**
     * Handles the requesting of the camera permission.  This includes
     * showing a "Snackbar" message of why the permission is needed then
     * sending the request.
     */
    private void requestCameraPermission() {
        // Log.w(TAG, "Camera permission is not granted. Requesting permission");

        // final String[] permissions = new String[]{Manifest.permission.CAMERA};

        // if (!ActivityCompat.shouldShowRequestPermissionRationale(this,
        //         Manifest.permission.CAMERA)) {
        //     ActivityCompat.requestPermissions(this, permissions, RC_HANDLE_CAMERA_PERM);
        //     return;
        // }

        // final Activity thisActivity = this;

        // View.OnClickListener listener = new View.OnClickListener() {
        //     @Override
        //     public void onClick(View view) {
        //         ActivityCompat.requestPermissions(thisActivity, permissions,
        //                 RC_HANDLE_CAMERA_PERM);
        //     }
        // };

        // Snackbar.make(mGraphicOverlay, R.string.permission_camera_rationale,
        //         Snackbar.LENGTH_INDEFINITE)
        //         .setAction(R.string.ok, listener)
        //         .show();
    }





    private void createCameraSource(boolean autoFocus, boolean useFlash,Context context) {


        // A text recognizer is created to find text.  An associated processor instance
        // is set to receive the text recognition results and display graphics for each text block
        // on screen.
        textRecognizer = new TextRecognizer.Builder(context).build();
        OcrDetectorProcessor mOcrDetectorProcessor = new OcrDetectorProcessor(mGraphicOverlay,mDetections);
        textRecognizer.setProcessor(mOcrDetectorProcessor);

        if (!textRecognizer.isOperational()) {

            Log.w(TAG, "Detector dependencies are not yet available.");

            // Check for low storage.  If there is low storage, the native library will not be
            // downloaded, so detection will not become operational.
            IntentFilter lowstorageFilter = new IntentFilter(Intent.ACTION_DEVICE_STORAGE_LOW);
            // boolean hasLowStorage = registerReceiver(null, lowstorageFilter) != null;

            // if (hasLowStorage) {
            //     Toast.makeText(this, R.string.low_storage_error, Toast.LENGTH_LONG).show();
            //     Log.w(TAG, getString(R.string.low_storage_error));
            // }
        }

        // Creates and starts the camera.  Note that this uses a higher resolution in comparison
        // to other detection examples to enable the text recognizer to detect small pieces of text.
        mCameraSource =
                new CameraSource.Builder(context, textRecognizer)
                        .setFacing(CameraSource.CAMERA_FACING_BACK)
                        .setRequestedPreviewSize(1280, 1024)
                        .setRequestedFps(2.0f)
                        .setFlashMode(useFlash ? Camera.Parameters.FLASH_MODE_TORCH : null)
                        .setFocusMode(autoFocus ? Camera.Parameters.FOCUS_MODE_CONTINUOUS_PICTURE : null)
                        .build();
        mOcrDetectorProcessor.setScanTextView(this);
        startCameraSource();
    }

    public void onResume() {
        startCameraSource(); // workaround for reload js
        // mPreview.onResume();
    }

    public void onPause() {
        mPreview.stop();  // workaround for reload js
        // mPreview.onPause();
        if (mCameraSource != null) {
            mCameraSource.stop();
            //  mCameraSource.release();
        }
    }

    public void setCameraType(String cameraType) {
        //  mPreview.setCameraType(cameraType);
    }

    public boolean setFlash(boolean flag) {
        mCameraSource.setFlashMode(flag?Camera.Parameters.FLASH_MODE_TORCH :Camera.Parameters.FLASH_MODE_OFF);
        return true;
    }

    public void stopCamera() {
        // mPreview.stop();
        if (mPreview != null) {
            mPreview.release();
        }
        //if (mCameraSource != null) {
        //  mCameraSource.stop();
        //  mCameraSource.release();
        // }
    }

    public void startCamera(boolean showFlash) {
        createCameraSource(true,showFlash,getContext());

    }


    public void adjustPreviewTop(int l, int t, int r, int b) {
        if (mPreview != null) {
            setMargins (mPreview, l,t,r,b,this);
        }
    }

    public static void setMargins (View v, int l, int t, int r, int b,ScanTextView s) {
        if (v.getLayoutParams() instanceof ViewGroup.MarginLayoutParams) {
            ViewGroup.MarginLayoutParams p = (ViewGroup.MarginLayoutParams) v.getLayoutParams();
            p.setMargins(p.leftMargin  , p.topMargin , p.rightMargin  , p.bottomMargin  );
            //s.setPadding(s.getPaddingTop() +l, s.getPaddingLeft() +l, s.getPaddingRight() +r, s.getPaddingBottom() +b);
             v.setPadding(v.getPaddingTop() +l, v.getPaddingLeft() +l, v.getPaddingRight() +r, v.getPaddingBottom() +b);
            v.setLayoutParams(p);
        }
    }







    public void onRequestPermissionsResult(int requestCode,
                                           @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        // if (requestCode != RC_HANDLE_CAMERA_PERM) {
        //     Log.d(TAG, "Got unexpected permission result: " + requestCode);
        //     super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        //     return;
        // }

        // if (grantResults.length != 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
        //     Log.d(TAG, "Camera permission granted - initialize the camera source");
        //     // We have permission, so create the camerasource
        //     boolean autoFocus = getIntent().getBooleanExtra(AutoFocus,false);
        //     boolean useFlash = getIntent().getBooleanExtra(UseFlash, false);
        //     createCameraSource(autoFocus, useFlash);
        //     return;
        // }

        // Log.e(TAG, "Permission not granted: results len = " + grantResults.length +
        //         " Result code = " + (grantResults.length > 0 ? grantResults[0] : "(empty)"));

        // DialogInterface.OnClickListener listener = new DialogInterface.OnClickListener() {
        //     public void onClick(DialogInterface dialog, int id) {
        //         finish();
        //     }
        // };

        // AlertDialog.Builder builder = new AlertDialog.Builder(this);
        // builder.setTitle("Multitracker sample")
        //         .setMessage(R.string.no_camera_permission)
        //         .setPositiveButton(R.string.ok, listener)
        //         .show();
    }

    public void startCameraSource() throws SecurityException {
        // Check that the device has play services available.
        // int code = GoogleApiAvailability.getInstance().isGooglePlayServicesAvailable(
        //         getApplicationContext());
        // if (code != ConnectionResult.SUCCESS) {
        //     Dialog dlg =
        //             GoogleApiAvailability.getInstance().getErrorDialog(this, code, RC_HANDLE_GMS);
        //     dlg.show();
        // }

        if (mCameraSource != null) {
            try {
                mPreview.start(mCameraSource, mGraphicOverlay);
                mCameraSource.setFlashMode(startFlash ? Camera.Parameters.FLASH_MODE_TORCH : null);
            } catch (IOException e) {
                Log.e(TAG, "Unable to start camera source.", e);
                mCameraSource.release();
                mCameraSource = null;
            }
        }
    }


    private boolean onTap(float rawX, float rawY) {
        OcrGraphic graphic = mGraphicOverlay.getGraphicAtLocation(rawX, rawY);
        TextBlock text = null;
        // if (graphic != null) {
        //     text = graphic.getTextBlock();
        //     if (text != null && text.getValue() != null) {
        //         Intent data = new Intent();
        //         data.putExtra(TextBlockObject, text.getValue());
        //         setResult(CommonStatusCodes.SUCCESS, data);
        //         finish();
        //     }
        //     else {
        //         Log.d(TAG, "text data is null");
        //     }
        // }
        // else {
        //     Log.d(TAG,"no text detected");
        // }
        return text != null;
    }

    private class CaptureGestureListener extends GestureDetector.SimpleOnGestureListener {

        @Override
        public boolean onSingleTapConfirmed(MotionEvent e) {
            return onTap(e.getRawX(), e.getRawY()) || super.onSingleTapConfirmed(e);
        }
    }

    private class ScaleListener implements ScaleGestureDetector.OnScaleGestureListener {


        @Override
        public boolean onScale(ScaleGestureDetector detector) {
            return false;
        }


        @Override
        public boolean onScaleBegin(ScaleGestureDetector detector) {
            return true;
        }


        @Override
        public void onScaleEnd(ScaleGestureDetector detector) {
            mCameraSource.doZoom(detector.getScaleFactor());
        }
    }
}