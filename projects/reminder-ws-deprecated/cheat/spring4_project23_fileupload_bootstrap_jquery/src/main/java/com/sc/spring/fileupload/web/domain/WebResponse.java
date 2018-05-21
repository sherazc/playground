package com.sc.spring.fileupload.web.domain;

public class WebResponse {
    private boolean success;
    private String msg;

    public WebResponse() {
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
