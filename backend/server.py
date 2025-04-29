from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from ultralytics import YOLO
import base64

app = Flask(__name__)
CORS(app)
model = YOLO("yolov8m.pt")


@app.route('/detect', methods=['POST'])
def detect():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']
    img_bytes = file.read()
    img = cv2.imdecode(np.frombuffer(img_bytes, np.uint8), cv2.IMREAD_COLOR)
    output_img = img.copy()

    results = model(img)
    pizza_count = 0

    for result in results:
        for box in result.boxes:
            if model.names[int(box.cls)] == 'pizza':
                pizza_count += 1
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cv2.rectangle(output_img, (x1, y1), (x2, y2), (0, 255, 0), 2)

    _, buffer = cv2.imencode('.jpg', output_img)
    output_base64 = base64.b64encode(buffer).decode('utf-8')

    return jsonify({
        "count": pizza_count,
        "image": output_base64
    })


if __name__ == '__main__':
    app.run(debug=True)