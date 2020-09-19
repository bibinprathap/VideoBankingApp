package com.rnvideochat.scantext;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.RectF;
import android.view.View;
import com.rnvideochat.scantext.GraphicOverlay;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.android.gms.vision.text.Text;
import com.google.android.gms.vision.text.TextBlock;

import java.util.List;

public class OcrGraphic extends GraphicOverlay.Graphic {

    private int mId;
    private static final int TEXT_COLOR = Color.WHITE;
    private static Paint sRectPaint;
    private static Paint sTextPaint;
    private final TextBlock mText;


    OcrGraphic(GraphicOverlay overlay, TextBlock text ) {
        super(overlay);

        mText = text;



        if (sRectPaint == null) {
            sRectPaint = new Paint();
            sRectPaint.setColor(TEXT_COLOR);
            sRectPaint.setStyle(Paint.Style.STROKE);
            sRectPaint.setStrokeWidth(4.0f);
        }

        if (sTextPaint == null) {
            sTextPaint = new Paint();
            sTextPaint.setColor(TEXT_COLOR);
            sTextPaint.setTextSize(54.0f);
        }
        // Redraw the overlay, as this graphic has been added.
        postInvalidate();
    }

    public int getId() {
        return mId;
    }

    public void setId(int id) {
        this.mId = id;
    }

    public TextBlock getTextBlock() {
        return mText;
    }

    /**
     * Checks whether a point is within the bounding box of this graphic.
     * The provided point should be relative to this graphic's containing overlay.
     * @param x An x parameter in the relative context of the canvas.
     * @param y A y parameter in the relative context of the canvas.
     * @return True if the provided point is contained within this graphic's bounding box.
     */
    public boolean contains(float x, float y) {
        TextBlock text = mText;
        if (text == null) {
            return false;
        }
        RectF rect = new RectF(text.getBoundingBox());
        rect.left = translateX(rect.left);
        rect.top = translateY(rect.top);
        rect.right = translateX(rect.right);
        rect.bottom = translateY(rect.bottom);
        return (rect.left < x && rect.right > x && rect.top < y && rect.bottom > y);
    }

    /**
     * Draws the text block annotations for position, size, and raw value on the supplied canvas.
     */
    @Override
    public void draw(Canvas canvas) {
        TextBlock text = mText;
        if (text == null) {
            return;
        }

        // Draws the bounding box around the TextBlock.
        RectF rect = new RectF(text.getBoundingBox());
        rect.left = translateX(rect.left);
        rect.top = translateY(rect.top);
        rect.right = translateX(rect.right);
        rect.bottom = translateY(rect.bottom);

        boolean  diddrawRect = false;

        // Break the text into multiple lines and draw each one according to its own bounding box.
        List<? extends Text> textComponents = text.getComponents();
        for(Text currentText : textComponents) {
            float left = translateX(currentText.getBoundingBox().left);
            float bottom = translateY(currentText.getBoundingBox().bottom);
            String  newstr = filterInteger(currentText.getValue());
            if(newstr.length() >14) {
                canvas.drawText(newstr, left, bottom, sTextPaint);

                if(diddrawRect==false) {
                    canvas.drawRect(rect, sRectPaint);
                }
                diddrawRect = true;
            }
        }
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
}