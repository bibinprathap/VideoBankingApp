package com.rnvideochat.scantext;

import android.util.SparseArray;
import android.graphics.RectF;

import com.google.android.gms.vision.CameraSource;
import com.rnvideochat.scantext.GraphicOverlay;
import com.google.android.gms.vision.Detector;
import com.google.android.gms.vision.text.Text;
import com.google.android.gms.vision.text.TextBlock;


public class OcrDetectorProcessor implements Detector.Processor<TextBlock> {

    private GraphicOverlay<OcrGraphic> mGraphicOverlay;
    private Detector.Detections<TextBlock> mDetections;
    private ScanTextView mScanTextView;

    OcrDetectorProcessor(GraphicOverlay<OcrGraphic> ocrGraphicOverlay,Detector.Detections<TextBlock> ocrdetections ) {
        mGraphicOverlay = ocrGraphicOverlay;
        mDetections= ocrdetections;

    }

    public void setScanTextView(ScanTextView scanTextView) {
        mScanTextView = scanTextView;
    }

    @Override
    public void receiveDetections(Detector.Detections<TextBlock> detections) {
        mGraphicOverlay.clear();
        SparseArray<TextBlock> items = detections.getDetectedItems();
        mDetections =  detections;
        String mEmiratesId = "";
        for (int i = 0; i < items.size(); ++i) {
            TextBlock item = items.valueAt(i);
            // OcrGraphic graphic = new OcrGraphic(mGraphicOverlay, item);
            //  mGraphicOverlay.add(graphic);
            for(Text currentText : item.getComponents()) {
                String  newstr = currentText.getValue();
                RectF rect = new RectF(item.getBoundingBox());

                mEmiratesId = newstr;
            }
        }
        mScanTextView.saveId(mEmiratesId);
    }


    public String filterInteger(String str) {
        int size = str.length();
        String newstr = "";

        for (int i = 0; i < size; i++) {
            if (Character.isDigit(str.charAt(i))) {
                newstr = newstr + str.charAt(i);
            }
        }

        return newstr;
    }
    /**
     * Frees the resources associated with this detection processor.
     */
    @Override
    public void release() {
        mGraphicOverlay.clear();
    }
}