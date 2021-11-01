import requests
import json
import sys

endpoint = sys.argv[1]
key = sys.argv[2]
image = "/src/" + sys.argv[3]

headers = {'Ocp-Apim-Subscription-Key': key}
file = {'image' : ('myfile', open(image, 'rb'))}

try:
    response = requests.post(endpoint, headers=headers, files=file)
    response.raise_for_status()
    json_data = response.json()
    tags = json_data["tags"]
    results = []

    for tag in tags:
        if tag["displayName"] == "":
            actions = tag["actions"]

            for action in actions:
                if action["actionType"] == "VisualSearch":
                    data = action["data"]
                    values = data["value"]

                    for value in values:
                        item = {
                            "url": value["hostPageDisplayUrl"],
                            "description": value["name"],
                            "image": value["contentUrl"],
                            "price": value["height"],
                            "date": value["hostPageDiscoveredDate"]
                        }
                        results.append(item)

    final = { "results": results }
    final_json = json.dumps(final)

    print(final_json)

except Exception as ex:
    print(ex)
