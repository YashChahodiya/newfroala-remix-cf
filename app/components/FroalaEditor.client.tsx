import React, { useEffect, useState, useCallback } from "react";

const ClientOnly: React.FC<{ children: () => React.ReactNode }> = ({
  children,
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children()}</>;
};

const CustomFroalaEditor: React.FC = () => {
  const [EditorComponent, setEditorComponent] =
    useState<React.ComponentType<any> | null>(null);
  // const [showSecondEditor, setShowSecondEditor] = useState(false);

  const loadEditor = useCallback(async () => {
    if (typeof window !== "undefined") {
      const [reactFroalaModule, froalaModule] = await Promise.all([
        import("react-froala-wysiwyg"),
        import("froala-editor"),
        import("froala-editor/js/plugins/align.min.js"),
        import("froala-editor/js/plugins/char_counter.min.js"),
        import("froala-editor/js/plugins/code_view.min.js"),
        import("froala-editor/js/plugins/colors.min.js"),
        import("froala-editor/js/plugins/emoticons.min.js"),
        import("froala-editor/js/plugins/entities.min.js"),
        import("froala-editor/js/plugins/file.min.js"),
        import("froala-editor/js/plugins/font_family.min.js"),
        import("froala-editor/js/plugins/font_size.min.js"),
        import("froala-editor/js/plugins/image.min.js"),
        import("froala-editor/js/plugins/image_manager.min.js"),
        import("froala-editor/js/plugins/line_breaker.min.js"),
        import("froala-editor/js/plugins/link.min.js"),
        import("froala-editor/js/plugins/lists.min.js"),
        import("froala-editor/js/plugins/paragraph_format.min.js"),
        import("froala-editor/js/plugins/paragraph_style.min.js"),
        import("froala-editor/js/plugins/quick_insert.min.js"),
        import("froala-editor/js/plugins/quote.min.js"),
        import("froala-editor/js/plugins/table.min.js"),
        import("froala-editor/js/plugins/url.min.js"),
        import("froala-editor/js/plugins/video.min.js"),
        import("froala-editor/js/plugins/fullscreen.min.js"),
      ]);

      const FroalaEditor = reactFroalaModule.default;
      const Froala = froalaModule.default;

      Froala.DefineIcon("myCustomButton", {
        NAME: "star",
        SVG_KEY: "imageClass",
      });

      Froala.RegisterCommand("myCustomButton", {
        title: "Insert Custom Content",
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function () {
          console.log("star item");
          window.alert("Welcome to New Froala");
        },
      });

      Froala.DefineIcon("clear", { NAME: "remove", SVG_KEY: "remove" });
      Froala.RegisterCommand("remove", {
        title: "Clear HTML",
        focus: false,
        undo: true,
        refreshAfterCallback: true,
        callback: function () {
          this.html.set("");
          this.events.focus();
        },
      });

      Froala.DefineIcon("myCustomDropdown", {
        NAME: "@",
        SVG_KEY: "cogs",
      });

      Froala.RegisterCommand("myCustomDropdown", {
        type: "dropdown",
        title: "Custom Dropdown",
        focus: true,
        undo: false,
        refreshAfterCallback: true,
        options: {
          add1: "add 1",
          add2: "add 2",
          add3: "add 3",
          add4: "add 4",
          add5: "add 5",
        },
        callback: function (cmd, val) {
          this.html.insert(val);
          console.log("Inserted:", val);
        },
      });

      setEditorComponent(() => FroalaEditor);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    loadEditor().then(() => {
      if (isMounted) {
        setEditorComponent((prevComponent) => prevComponent);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [loadEditor]);

  const config = {
    height: 500,
    toolbarButtons: [
      [
        "paragraphFormat",
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "subscript",
        "superscript",
      ],
      [
        "fontFamily",
        "fontSize",
        "color",
        "backgroundColor",
        "inlineClass",
        "inlineStyle",
      ],
      ["alignLeft", "alignCenter", "alignRight", "alignJustify"],
      ["formatOL", "formatUL", "outdent", "indent"],
      ["quote", "insertLink", "insertImage", "insertVideo", "insertTable"],
      ["emoticons", "fontAwesome", "specialCharacters", "insertHR"],
      ["selectAll", "clearFormatting", "print", "help", "html"],
      ["undo", "redo"],
      ["getPDF", "spellChecker", "lineHeight", "insertFile"],
      ["insertCodeSnippet", "codeView", "dragAndDrop", "wordPaste", "save"],
      ["myCustomButton", "myCustomDropdown", "remove", "fullscreen"],
    ],
    events: {
      initialized: function () {
        console.log("Froala Editor initialized");
      },
    },
  };

  return (
    <ClientOnly>
      {() =>
        EditorComponent ? (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <EditorComponent tag="textarea" config={config} />
            </div>
            {/* {showSecondEditor && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <EditorComponent tag="textarea" config={config} />
              </div>
            )} */}
          </>
        ) : (
          <div>Loading editor...</div>
        )
      }
    </ClientOnly>
  );
};

export default CustomFroalaEditor;
