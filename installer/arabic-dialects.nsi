; Arabic Dialects - Windows installer (NSIS)
; Per-user install, no admin rights required.

Unicode true

!define APP_NAME "Arabic Dialects"
!define APP_VERSION "1.0.0"
!define PUBLISHER "Arabic Dialects"
!define APP_DIR "ArabicDialects"
!define UNINST_KEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\ArabicDialects"

Name "${APP_NAME} ${APP_VERSION}"
OutFile "..\dist\ArabicDialectsSetup.exe"
InstallDir "$LOCALAPPDATA\${APP_DIR}"
RequestExecutionLevel user
SetCompressor /SOLID lzma

; Modern UI
!include "MUI2.nsh"
!define MUI_ABORTWARNING
!define MUI_ICON "..\assets\icon.ico"
!define MUI_UNICON "..\assets\icon.ico"
!define MUI_FINISHPAGE_RUN "$INSTDIR\ArabicDialects.cmd"
!define MUI_FINISHPAGE_RUN_TEXT "Open Arabic Dialects now"
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_LANGUAGE "English"

; App payload: the web files, plus a launcher and an uninstaller.
Section "Application" SEC_APP
    SetOutPath "$INSTDIR"
    File "..\index.html"
    File "..\manifest.webmanifest"
    File "..\sw.js"
    File /r "..\css"
    File /r "..\data"
    File /r "..\js"
    File /r "..\assets"

    ; Launcher: open in Edge app mode if available, else the default browser.
    FileOpen $0 "$INSTDIR\ArabicDialects.cmd" w
    FileWrite $0 "@echo off$\r$\n"
    FileWrite $0 "set APP=%~dp0index.html$\r$\n"
    FileWrite $0 "set EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe$\r$\n"
    FileWrite $0 "if exist $\"%EDGE%$\" (start $\"$\" $\"%EDGE%$\" --app=$\"file:///%APP:\=/%$\" & exit /b)$\r$\n"
    FileWrite $0 "set EDGE2=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe$\r$\n"
    FileWrite $0 "if exist $\"%EDGE2%$\" (start $\"$\" $\"%EDGE2%$\" --app=$\"file:///%APP:\=/%$\" & exit /b)$\r$\n"
    FileWrite $0 "start $\"$\" $\"file:///%APP:\=/%$\"$\r$\n"
    FileClose $0

    ; Shortcuts
    CreateDirectory "$SMPROGRAMS\${APP_NAME}"
    CreateShortCut "$SMPROGRAMS\${APP_NAME}\${APP_NAME}.lnk" "$INSTDIR\ArabicDialects.cmd" "" "$INSTDIR\assets\icon.ico" 0
    CreateShortCut "$SMPROGRAMS\${APP_NAME}\Uninstall ${APP_NAME}.lnk" "$INSTDIR\Uninstall.exe"
    CreateShortCut "$DESKTOP\${APP_NAME}.lnk" "$INSTDIR\ArabicDialects.cmd" "" "$INSTDIR\assets\icon.ico" 0

    ; Add/Remove Programs entry
    WriteRegStr HKCU "${UNINST_KEY}" "DisplayName" "${APP_NAME}"
    WriteRegStr HKCU "${UNINST_KEY}" "DisplayVersion" "${APP_VERSION}"
    WriteRegStr HKCU "${UNINST_KEY}" "Publisher" "${PUBLISHER}"
    WriteRegStr HKCU "${UNINST_KEY}" "DisplayIcon" "$INSTDIR\assets\icon.ico"
    WriteRegStr HKCU "${UNINST_KEY}" "UninstallString" "$\"$INSTDIR\Uninstall.exe$\""
    WriteRegStr HKCU "${UNINST_KEY}" "InstallLocation" "$INSTDIR"
    WriteRegDWORD HKCU "${UNINST_KEY}" "NoModify" 1
    WriteRegDWORD HKCU "${UNINST_KEY}" "NoRepair" 1

    WriteUninstaller "$INSTDIR\Uninstall.exe"
SectionEnd

Section "Uninstall"
    Delete "$DESKTOP\${APP_NAME}.lnk"
    Delete "$SMPROGRAMS\${APP_NAME}\${APP_NAME}.lnk"
    Delete "$SMPROGRAMS\${APP_NAME}\Uninstall ${APP_NAME}.lnk"
    RMDir "$SMPROGRAMS\${APP_NAME}"
    DeleteRegKey HKCU "${UNINST_KEY}"
    RMDir /r "$INSTDIR"
SectionEnd
