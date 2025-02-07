import { useState, useEffect, useRef } from "react";
import {
  ScheduleComponent,
  TimelineViews,
  TimelineMonth,
  Inject,
  ResourcesDirective,
  ResourceDirective,
  ViewsDirective,
  ViewDirective,
  DragAndDrop,
  Resize,
} from "@syncfusion/ej2-react-schedule";

const generateResourceData = (startChar, endChar) => {
  const colors = [
    "#df5286", "#7fa900", "#ea7a57", "#5978ee", "#ff5733", "#33ff57",
    "#5733ff", "#ff33a1", "#33a1ff", "#a1ff33", "#ffa500", "#800080",
    "#008080", "#ff4500", "#4682b4"
  ];
  let resources = [];
  for (let i = startChar.charCodeAt(0), j = 0; i <= endChar.charCodeAt(0); i++, j++) {
    resources.push({
      id: i - 64,
      text: `Resource ${String.fromCharCode(i)}`,
      color: colors[j % colors.length],
    });
  }
  return resources;
};

const resourceDataSource = generateResourceData("A", "O");

const InlineEditing = () => {
  const scheduleRef = useRef(null);
  const [data, setData] = useState([
    { Id: 1, Subject: "Task 1", StartTime: new Date(2025, 1, 4, 10, 0), EndTime: new Date(2025, 1, 4, 17, 0), TaskId: 1 },
    { Id: 2, Subject: "Task 2", StartTime: new Date(2025, 1, 5, 12, 0), EndTime: new Date(2025, 1, 5, 13, 0), TaskId: 5 },
    { Id: 3, Subject: "Task 3", StartTime: new Date(2025, 1, 6, 14, 0), EndTime: new Date(2025, 1, 6, 15, 0), TaskId: 10 },
    { Id: 4, Subject: "Task 4", StartTime: new Date(2025, 1, 7, 16, 0), EndTime: new Date(2025, 1, 7, 17, 0), TaskId: 15 },
  ]);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const onDeleteEvent = () => {
    if (selectedEventId !== null) {
      const eventToDelete = data.find(event => event.Id === selectedEventId);
      if (eventToDelete) {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${eventToDelete.Subject}"?`);
        if (confirmDelete) {
          setData((prevData) => prevData.filter((event) => event.Id !== selectedEventId));
          setSelectedEventId(null);
        }
      }
    }
  };

  const eventTemplate = (props) => (
    <div
      style={{
        backgroundColor: resourceDataSource.find(res => res.id === props.TaskId)?.color || "#ccc",
        padding: "1px",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "50px",
        cursor: "pointer",
        outline: selectedEventId === props.Id ? "2px solid red" : "none",
      }}
      onClick={() => setSelectedEventId(props.Id)}
    >
      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {props.Subject}
      </span>
    </div>
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        onDeleteEvent();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEventId, data]);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <ScheduleComponent
        width="100%"
        height="100%"
        ref={scheduleRef}
        cssClass="inline-edit"
        workDays={[0, 1, 2, 3, 4, 5]}
        currentView="TimelineMonth"
        allowInline
        selectedDate={new Date(2025, 1, 4)}
        eventSettings={{ dataSource: data, template: eventTemplate }}
        group={{ resources: ["Categories"] }}
      >
        <ResourcesDirective>
          <ResourceDirective
            field="TaskId"
            title="Category"
            name="Categories"
            allowMultiple={true}
            dataSource={resourceDataSource}
            textField="text"
            idField="id"
            colorField="color"
          />
        </ResourcesDirective>

        <ViewsDirective>
          <ViewDirective option="TimelineMonth" />
        </ViewsDirective>

        <Inject services={[TimelineViews, TimelineMonth, DragAndDrop, Resize]} />
      </ScheduleComponent>
    </div>
  );
};

export default InlineEditing;
