# # License Plate Detection and Recognition with YOLOv10 and PaddleOCR
# import json
# import cv2
# from ultralytics import YOLOv10
# import numpy as np
# import math
# import re
# import os
# import sqlite3
# from datetime import datetime
# from paddleocr import PaddleOCR

# os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

# # Video file path
# video_file = "data/Florida.mp4"

# # Create a Video Capture Object
# cap = cv2.VideoCapture(video_file)

# # Extract location from the file name (e.g., "delhi_camera1.mp4" → "delhi_camera1")
# location = os.path.splitext(os.path.basename(video_file))[0]

# # Initialize the YOLOv10 Model
# model = YOLOv10("weights/best.pt")

# # Initialize the frame count
# count = 0

# # Class Names
# className = ["License"]

# # Initialize the Paddle OCR
# ocr = PaddleOCR(use_angle_cls=True, use_gpu=False)


# def paddle_ocr(frame, x1, y1, x2, y2):
#     frame = frame[y1:y2, x1:x2]  # Crop the detected license plate region
#     result = ocr.ocr(frame, det=False, rec=True, cls=False)
#     text = ""
#     for r in result:
#         scores = r[0][1]
#         if np.isnan(scores):
#             scores = 0
#         else:
#             scores = int(scores * 100)
#         if scores > 60:
#             text = r[0][0]
#     pattern = re.compile('[\\W]')
#     text = pattern.sub('', text)
#     text = text.replace("???", "")
#     text = text.replace("O", "0")
#     text = text.replace("粤", "")
#     return str(text)


# def save_json(license_plates, startTime, endTime):
#     # Generate individual JSON files for each 20-second interval
#     interval_data = {
#         "Start Time": startTime.isoformat(),
#         "End Time": endTime.isoformat(),
#         "License Plate": list(license_plates),
#         "Location": location
#     }
#     interval_file_path = "json/output_" + datetime.now().strftime("%Y%m%d%H%M%S") + ".json"
#     with open(interval_file_path, 'w') as f:
#         json.dump(interval_data, f, indent=2)

#     # Cumulative JSON File
#     cumulative_file_path = "json/LicensePlateData.json"
#     if os.path.exists(cumulative_file_path):
#         with open(cumulative_file_path, 'r') as f:
#             existing_data = json.load(f)
#     else:
#         existing_data = []

#     # Add new interval data to cumulative data
#     existing_data.append(interval_data)

#     with open(cumulative_file_path, 'w') as f:
#         json.dump(existing_data, f, indent=2)

#     # Save data to SQL database
#     save_to_database(license_plates, startTime, endTime, location)


# def save_to_database(license_plates, start_time, end_time, location):
#     conn = sqlite3.connect('licensePlatesDatabase.db')
#     cursor = conn.cursor()
#     for plate in license_plates:
#         cursor.execute('''
#             INSERT INTO LicensePlates(start_time, end_time, license_plate, location)
#             VALUES (?, ?, ?, ?)
#         ''', (start_time.isoformat(), end_time.isoformat(), plate, location))
#     conn.commit()
#     conn.close()


# startTime = datetime.now()
# license_plates = set()

# while True:
#     ret, frame = cap.read()
#     if ret:
#         currentTime = datetime.now()
#         count += 1
#         print(f"Frame Number: {count}")
#         results = model.predict(frame, conf=0.45)
#         for result in results:
#             boxes = result.boxes
#             for box in boxes:
#                 x1, y1, x2, y2 = box.xyxy[0]
#                 x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
#                 cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
#                 classNameInt = int(box.cls[0])
#                 clsName = className[classNameInt]
#                 conf = math.ceil(box.conf[0] * 100) / 100
#                 label = paddle_ocr(frame, x1, y1, x2, y2)
#                 if label:
#                     license_plates.add(label)
#                 textSize = cv2.getTextSize(label, 0, fontScale=0.5, thickness=2)[0]
#                 c2 = x1 + textSize[0], y1 - textSize[1] - 3
#                 cv2.rectangle(frame, (x1, y1), c2, (255, 0, 0), -1)
#                 cv2.putText(frame, label, (x1, y1 - 2), 0, 0.5, [255, 255, 255], thickness=1, lineType=cv2.LINE_AA)
#         if (currentTime - startTime).seconds >= 20:
#             endTime = currentTime
#             save_json(license_plates, startTime, endTime)
#             startTime = currentTime
#             license_plates.clear()
#         cv2.imshow("Video", frame)
#         if cv2.waitKey(1) & 0xFF == ord('1'):
#             break
#     else:
#         break

# cap.release()
# cv2.destroyAllWindows()




# License Plate Detection and Recognition with YOLOv10 and PaddleOCR
import json
import cv2
from ultralytics import YOLOv10
import numpy as np
import math
import re
import os
import sqlite3
from datetime import datetime
from paddleocr import PaddleOCR

os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

# Initialize the YOLOv10 Model and OCR only once
model = YOLOv10("weights/best.pt")
ocr = PaddleOCR(use_angle_cls=True, use_gpu=False)
className = ["License"]

# Make sure required folders exist
os.makedirs("json", exist_ok=True)

def paddle_ocr(frame, x1, y1, x2, y2):
    frame = frame[y1:y2, x1:x2]
    result = ocr.ocr(frame, det=False, rec=True, cls=False)
    text = ""
    for r in result:
        scores = r[0][1]
        if np.isnan(scores):
            scores = 0
        else:
            scores = int(scores * 100)
        if scores > 60:
            text = r[0][0]
    pattern = re.compile('[\\W]')
    text = pattern.sub('', text)
    text = text.replace("???", "").replace("O", "0").replace("粤", "")
    return str(text)


def save_json(license_plates, startTime, endTime, location):
    interval_data = {
        "Start Time": startTime.isoformat(),
        "End Time": endTime.isoformat(),
        "License Plate": list(license_plates),
        "Location": location
    }
    interval_file_path = "json/output_" + datetime.now().strftime("%Y%m%d%H%M%S") + ".json"
    with open(interval_file_path, 'w') as f:
        json.dump(interval_data, f, indent=2)

    cumulative_file_path = "json/LicensePlateData.json"
    if os.path.exists(cumulative_file_path):
        with open(cumulative_file_path, 'r') as f:
            existing_data = json.load(f)
    else:
        existing_data = []

    existing_data.append(interval_data)

    with open(cumulative_file_path, 'w') as f:
        json.dump(existing_data, f, indent=2)

    save_to_database(license_plates, startTime, endTime, location)


def save_to_databasee(license_plates, start_time, end_time, location):
    conn = sqlite3.connect('licensePlatesDatabase.db')
    cursor = conn.cursor()

    # Optional: Create the table with a unique constraint
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS LicensePlates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            start_time TEXT,
            end_time TEXT,
            license_plate TEXT,
            location TEXT,
            UNIQUE(license_plate, start_time, end_time, location)
        )
    ''')

    for plate in license_plates:
        # Reject garbage license plate data
        if not (6 <= len(plate) <= 10) or not plate.isalnum():
            continue

        try:
            cursor.execute('''
                INSERT OR IGNORE INTO LicensePlates (start_time, end_time, license_plate, location)
                VALUES (?, ?, ?, ?)
            ''', (start_time.isoformat(), end_time.isoformat(), plate, location))
        except Exception as e:
            print(f"Error inserting plate {plate}: {e}")

    conn.commit()
    conn.close()



# Use this function to insert plates with validation and uniqueness on license_plate only
def save_to_database(license_plates, start_time, end_time, location):
    conn = sqlite3.connect('licensePlatesDatabase.db')
    cursor = conn.cursor()

    for plate in license_plates:
        # Validate plate length and characters
        if not (6 <= len(plate) <= 10) or not plate.isalnum():
            continue

        try:
            cursor.execute('''
                INSERT OR IGNORE INTO LicensePlates (start_time, end_time, license_plate, location)
                VALUES (?, ?, ?, ?)
            ''', (start_time.isoformat(), end_time.isoformat(), plate, location))
        except Exception as e:
            print(f"Error inserting plate {plate}: {e}")

    conn.commit()
    conn.close()

# At program start (for example, in main or before processing videos/images),
# call these to ensure the DB is ready and cleaned
def initialize_database():
    import sqldb  # your sqldb.py
    sqldb.create_table()
    sqldb.cleanup_duplicates()

# Then in your entry point before processing:
initialize_database()
# Then process your videos/images as usual...



def process_video(video_path):
    cap = cv2.VideoCapture(video_path)
    location = os.path.splitext(os.path.basename(video_path))[0]
    startTime = datetime.now()
    license_plates = set()
    count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        count += 1
        currentTime = datetime.now()
        print(f"[{location}] Frame Number: {count}")
        results = model.predict(frame, conf=0.45)
        for result in results:
            boxes = result.boxes
            for box in boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                label = paddle_ocr(frame, x1, y1, x2, y2)
                if label:
                    license_plates.add(label)
                cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
                textSize = cv2.getTextSize(label, 0, fontScale=0.5, thickness=2)[0]
                c2 = x1 + textSize[0], y1 - textSize[1] - 3
                cv2.rectangle(frame, (x1, y1), c2, (255, 0, 0), -1)
                cv2.putText(frame, label, (x1, y1 - 2), 0, 0.5, [255, 255, 255], 1, lineType=cv2.LINE_AA)
        if (currentTime - startTime).seconds >= 20:
            save_json(license_plates, startTime, currentTime, location)
            startTime = currentTime
            license_plates.clear()
        cv2.imshow(f"{location}", frame)
        if cv2.waitKey(1) & 0xFF == ord('1'):
            break

    cap.release()
    cv2.destroyAllWindows()


def process_image(image_path):
    frame = cv2.imread(image_path)
    location = os.path.splitext(os.path.basename(image_path))[0]
    license_plates = set()
    results = model.predict(frame, conf=0.45)
    for result in results:
        boxes = result.boxes
        for box in boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            label = paddle_ocr(frame, x1, y1, x2, y2)
            if label:
                license_plates.add(label)
            cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
            textSize = cv2.getTextSize(label, 0, fontScale=0.5, thickness=2)[0]
            c2 = x1 + textSize[0], y1 - textSize[1] - 3
            cv2.rectangle(frame, (x1, y1), c2, (255, 0, 0), -1)
            cv2.putText(frame, label, (x1, y1 - 2), 0, 0.5, [255, 255, 255], 1, lineType=cv2.LINE_AA)
    now = datetime.now()
    save_json(license_plates, now, now, location)
    cv2.imshow(f"{location}", frame)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


# Entry point: iterate over files in "data" folder
supported_video = (".mp4", ".avi", ".mov", ".mkv")
supported_image = (".jpg", ".jpeg", ".png", ".bmp")

for file_name in os.listdir("data"):
    file_path = os.path.join("data", file_name)
    if file_name.lower().endswith(supported_video):
        print(f"\n[INFO] Processing video: {file_name}")
        process_video(file_path)
    elif file_name.lower().endswith(supported_image):
        print(f"\n[INFO] Processing image: {file_name}")
        process_image(file_path)
    else:
        print(f"[SKIPPED] Unsupported file type: {file_name}")


