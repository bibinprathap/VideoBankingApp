package com.rnvideochat.scantext;

import android.Manifest;
import android.content.pm.PackageManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import android.util.Log;
import android.util.SparseArray;
import com.facebook.react.uimanager.IllegalViewOperationException;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import java.io.IOException;
import android.view.View;
import javax.annotation.Nullable;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.infer.annotation.Assertions;
import java.util.Map;


public class ScanTextModule extends ViewGroupManager<ScanTextView> implements LifecycleEventListener {
    private static final String TAG = "ScanText";
    private boolean mScannerViewVisible;
    private ScanTextView mScannerView;


    private   String DEFAULT_TORCH_MODE = "off";
    private static final String DEFAULT_CAMERA_TYPE = "back";
    public static final int COMMAND_SAVE_IMAGE = 1;
    public static final int COMMAND_SET_FLASHMODE = 2;
    public static final int COMMAND_SET_STOP_CAMERA = 3;
    public static final int COMMAND_SET_START_CAMERA = 4;

    @Override
    //getName is required to define the name of the module represented in JavaScript
    public String getName() {
        return "ScanText";
    }

    @ReactProp(name = "cameraType")
    public void setCameraType(ScanTextView view, @Nullable String cameraType) {
        if (cameraType != null) {
            view.setCameraType(cameraType);
        }
    }

    @ReactProp(name = "torchMode")
    public void setTorchMode(ScanTextView view, @Nullable String torchMode) {
        if (torchMode != null) {
            DEFAULT_TORCH_MODE = torchMode;
            view.setFlash(torchMode.equals("on"));
        }
    }

    //       @ReactMethod
    // public void setFlashMode(String mode, Promise promise) {
    //     promise.resolve(mScannerView.setFlash(mode.equals("on")));
    // }



    @Override
    public Map<String,Integer> getCommandsMap() {
        Log.d("React"," View manager getCommandsMap:");
        return MapBuilder.of(
                "saveImage",
                COMMAND_SAVE_IMAGE,   "flashMode",
                COMMAND_SET_FLASHMODE, "stopCamera", COMMAND_SET_STOP_CAMERA, "startCamera", COMMAND_SET_START_CAMERA);
    }

    @Override
    public void receiveCommand(
            ScanTextView view,
            int commandType,
            @Nullable ReadableArray args) {
        Assertions.assertNotNull(view);
        Assertions.assertNotNull(args);
        switch (commandType) {
            case COMMAND_SAVE_IMAGE: {
                view.saveImage();
                return;
            }
                case   COMMAND_SET_FLASHMODE: {
                   // view.adjustPreviewTop(args.getInt(0),args.getInt(1),args.getInt(2),args.getInt(3));
                   view.setFlash(args.getString(0).equals("on"));
                    return;

                }
            case   COMMAND_SET_STOP_CAMERA: {
                view.stopCamera();
                return;

            }
            case   COMMAND_SET_START_CAMERA: {
                view.startCamera(DEFAULT_TORCH_MODE.equals("on"));
                return;

            }
                default:
                    throw new IllegalArgumentException(String.format(
                            "Unsupported command %d received by %s.",
                            commandType,
                            getClass().getSimpleName()));
            }
        }

        @Override
        public ScanTextView createViewInstance(ThemedReactContext context) {
            context.addLifecycleEventListener(this);
            mScannerView = new ScanTextView(context,DEFAULT_TORCH_MODE.equals("on"));
            mScannerView.setCameraType(DEFAULT_CAMERA_TYPE);
            mScannerView.setFlash(DEFAULT_TORCH_MODE.equals("on"));
            mScannerViewVisible = true;
            return mScannerView;
        }

        @Override
        public void onHostResume() {
            mScannerView.onResume();
        }

        @Override
        public void onHostPause() {
            mScannerView.onPause();
        }

        @Override
        public void onHostDestroy() {
            mScannerView.stopCamera();
        }

        @Override
        public void addView(ScanTextView parent, View child, int index) {
            parent.addView(child, index + 1);   // index 0 for camera preview reserved
        }



    }