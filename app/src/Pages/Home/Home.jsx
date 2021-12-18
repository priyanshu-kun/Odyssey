import { useState, useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import downloadContent from '../../downloadContent';
import { userSelector, useSelector } from "react-redux"
import showdown from "showdown"
import db from "../../config/firebase.config"
import {  getDoc, doc, setDoc } from "firebase/firestore"
import { useAuth0 } from "@auth0/auth0-react"


function Home() {

  const { user, isAuthenticated, isLoading } = useAuth0()
  const { name,picture,sub } = isAuthenticated ? user : {name: "",picture: "",sub: ""};
  const [editorTitle, setEditorTitle] = useState("")
  const [editorContent, setEditorContent] = useState("")
  const [setContent, setSetContent] = useState("Nothing to preview🧐")
  const [tooglePreview, setTooglePreview] = useState(true)
  const [saveState, setSaveState] = useState(false)
  const converter = new showdown.Converter()

  // console.log("Github User: ",user)

  function handleEditorTitle(e) {
    setEditorTitle(e.target.value)
  }


  useEffect(() => {
    if (setContent === "") {
      setSetContent("Nothing to preview🧐")
    }
  }, [setContent])

  async function handleEditorContent(e) {
    setEditorContent(e.target.value)
    setSetContent(e.target.value)
    setSaveState(true)
  }


  function handleToogle(e) {
    setTooglePreview(!tooglePreview)
  }

  function handleDownloadCode() {
    if (editorTitle === "") {
      return alert("Must use title before download content")
    }
    const html = converter.makeHtml(editorContent);
    downloadContent(html, editorTitle, name)
  }

  async function saveStuff() {
    const uid = sub
    try {
      const docRef = doc(db,"Documents",uid)
      const payload = {editorContent,editorTitle}
      await setDoc(docRef,payload)
      setSaveState(false)

    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    (async () => {
      const uid = sub;
      if(uid === "") {
        return;
      }
      const docRef = doc(db, "Documents", uid);
      const docSnap = await getDoc(docRef);
      console.log(docSnap)
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setEditorContent(docSnap.data().editorContent)
        setEditorTitle(docSnap.data().editorTitle)
        setSetContent(docSnap.data().editorContent)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })()

  }, [sub])


  return (
    isLoading ? (
      <div className="redirect-div">
        <div class="spinner"></div>
        <p className="message">Please wait...</p>
      </div>
    ) : (
     isAuthenticated ? (
      <>
      <Navbar editorTitle={editorTitle} editorContent={editorContent} saveState={saveState} saveStuff={saveStuff} userData={{ displayName: name, photoURL: picture }} handleToogle={handleToogle} handleDownloadCode={handleDownloadCode} />
      <div className="content-area">
        <div className={`editor ${!tooglePreview && "editor-width"}`}>
          <textarea cols="30" rows="10" placeholder="TITLE" value={editorTitle} onChange={handleEditorTitle}></textarea>
          <textarea cols="30" rows="10" placeholder="CONTENT" value={editorContent} onChange={handleEditorContent}></textarea>
        </div>
        {
          tooglePreview && (
            <div className="preview">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={docco}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]} className="markdown">{setContent}</ReactMarkdown>
            </div>
          )
        }
      </div>
    </>
     ): (
       <h1 style={{color: "#fff"}}>401 UnAuthorized</h1>
     )
    )
  );
}

export default Home;