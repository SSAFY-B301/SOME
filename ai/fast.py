from fastapi import FastAPI, File, UploadFile
import cv2
import numpy as np

app = FastAPI()


@app.get("/")
def root():
    return {'message': 'Hello World'}



@app.post('/yolo')
def yololo():
    min_confidence = 0.5

    # Load Yolo
    net = cv2.dnn.readNet("yolo/yolov3.weights", "yolo/yolov3.cfg")
    classes = []
    with open("yolo/coco.names", "r") as f:
        classes = [line.strip() for line in f.readlines()]
    layer_names = net.getLayerNames()
    #output_layers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]
    output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]

    colors = np.random.uniform(0, 255, size=(len(classes), 3))

    # Loading image
    img = cv2.imread("image/yolo_01.jpg")
    #img = cv2.resize(img, None, fx=0.4, fy=0.4)
    height, width, channels = img.shape

    # Detecting objects
    blob = cv2.dnn.blobFromImage(img, 0.00392, (416, 416), (0, 0, 0), True, crop=False)

    net.setInput(blob)
    outs = net.forward(output_layers)

    # Showing informations on the screen
    class_ids = []
    confidences = []
    boxes = []
    category = []
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > min_confidence:
                # Object detected
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)

                # Rectangle coordinates
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)

                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)
                

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, min_confidence, 0.4)
    font = cv2.FONT_HERSHEY_PLAIN
    for i in range(len(boxes)):
        if i in indexes:
            x, y, w, h = boxes[i]
            label = str(classes[class_ids[i]])
            category.append(str(classes[class_ids[i]]))
            print(i, label)
            color = colors[i]
            cv2.rectangle(img, (x, y), (x + w, y + h), color, 2)
            cv2.putText(img, label, (x, y + 30), font, 2, (0, 255, 0), 1)

    return { 'ids' : category}

@app.post('/yolo/file')
async def yololo(file: list[UploadFile] = File(...)):
    min_confidence = 0.5
    food = ["bottle","wine glass","cup","fork","knife","spoon","bowl","banana","apple","sandwich","orange","broccoli","carrot","hot dog","pizza","donut","cake","diningtable","microwave","oven","toaster"]
    animal = ["bird","cat","dog","horse","sheep","cow","elephant","bear","zebra","giraffe"]
    thing = ["bicycle","car","motorbike","aeroplane","bus","train","truck","boat","traffic light","fire hydrant","stop sign","parking meter","bench","backpack","umbrella","handbag","tie","suitcase","chair","sofa","bed","toilet","tvmonitor","laptop","mouse","remote","keyboard","cell phone","sink","refrigerator","book","clock","vase","scissors","teddy bear","hair drier","toothbrush","pottedplant"]
    sport = ["frisbee","skis","snowboard","sports ball","kite","baseball bat","baseball glove","skateboard","surfboard","tennis racket"]
    # Load Yolo
    net = cv2.dnn.readNet("yolo/yolov3.weights", "yolo/yolov3.cfg")
    classes = []
    with open("yolo/coco.names", "r") as f:
        classes = [line.strip() for line in f.readlines()]
    layer_names = net.getLayerNames()
    #output_layers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]
    output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]

    colors = np.random.uniform(0, 255, size=(len(classes), 3))
    category = []

    for f in file:
        file_contents = await f.read()
        np_array = np.frombuffer(file_contents, np.uint8)
        # Loading image
        img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
        #img = cv2.imread("image/yolo_01.jpg")
        #img = cv2.resize(img, None, fx=0.4, fy=0.4)
        height, width, channels = img.shape

        # Detecting objects
        blob = cv2.dnn.blobFromImage(img, 0.00392, (416, 416), (0, 0, 0), True, crop=False)

        net.setInput(blob)
        outs = net.forward(output_layers)

        # Showing informations on the screen
        class_ids = []
        confidences = []
        boxes = []
        for out in outs:
            for detection in out:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]
                if confidence > min_confidence:
                    # Object detected
                    center_x = int(detection[0] * width)
                    center_y = int(detection[1] * height)
                    w = int(detection[2] * width)
                    h = int(detection[3] * height)

                    # Rectangle coordinates
                    x = int(center_x - w / 2)
                    y = int(center_y - h / 2)

                    boxes.append([x, y, w, h])
                    confidences.append(float(confidence))
                    class_ids.append(class_id)
                    

        indexes = cv2.dnn.NMSBoxes(boxes, confidences, min_confidence, 0.4)
        font = cv2.FONT_HERSHEY_PLAIN
        categoryTemp = []
        personCnt = 0
        for i in range(len(boxes)):
            if i in indexes:
                label = str(classes[class_ids[i]])
                cate = str(classes[class_ids[i]])
                if cate == "person":
                    personCnt = personCnt + 1
                elif cate in food:
                    categoryTemp.append("food")
                elif cate in animal:
                    categoryTemp.append("animal")
                elif cate in thing:
                    categoryTemp.append("thing")
                else:
                    categoryTemp.append("sport")
                print(i, label)
        
        someTest = list(set(categoryTemp))
        if personCnt == 1:
            someTest.append("person")
        elif personCnt > 1:
            someTest.append("people")
            someTest.append("person")
        elif len(someTest) == 0:
            someTest.append("nature")
        category.append(someTest)

    return { 'category' : category}
