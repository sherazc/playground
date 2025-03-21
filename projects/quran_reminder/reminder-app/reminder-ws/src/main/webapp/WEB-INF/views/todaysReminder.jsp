<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    request.setAttribute("contextPath", request.getContextPath());
%>
<style type="text/css">
    @font-face {
        font-family: 'saleem';
        src: url('${serverUrl}/resources/fonts/saleem.ttf') format('truetype')
    }

    @font-face {
        font-family: 'me_quran';
        src: url('${serverUrl}/resources/fonts/me_quran.ttf') format('truetype')
    }
</style>
<c:if test="${showCss}">
<style type="text/css">
    #reminder_table {
        font-family: Arial;
        text-align: center;
        background-color: #fff8eb;
        border-radius: 5px;
        box-shadow: 1px 1px 2px #888888;
        border: 0;
        border-spacing: 0px;
        border-collapse: separate;
        font-size: 80%;
        color: #444;
    }

    .surahTitle {
        font-family: 'saleem';
        font-size: 100%;
    }

    .bismillah {
        font-family: 'saleem';
        color: #062707;
        font-size: 200%;
    }

    .surahTitleDescription {
        font-size: 70%;
    }

    .ayaArabic {
        font-family: 'saleem';
        color: #062707;
        font-size: 200%;
        background-color: #cbdfcc;
    }

    .ayaTranslation {

    }

    .ayaNumber {
        background-color: #cbdfcc;
    }

    .ayaTranslationName {
        font-size: 70%;
        color: #666;
    }

</style>
</c:if>
<table id="reminder_table" border="0">
    <tr>
        <td colspan="2" class="bismillah">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </td>
    </tr>

    <c:set var="ayaIndex" value="0"/>
    <c:forEach items="${ayaDetail.ayas}" var="aya">
        <tr>
            <td class="ayaNumber">(${aya.ayaNumber})</td>
            <td class="ayaArabic">${aya.lineString}</td>
        </tr>
        <tr class="ayaTranslation">
            <td></td>
            <td>${ayaDetail.translations[ayaIndex].lineString}</td>
        </tr>
        <c:set var="ayaIndex" value="${ayaIndex + 1}"/>
    </c:forEach>
    <tr>
        <td colspan="2">
        <span class="surahTitleDescription">
                ${suraName.english} - ${suraName.description} (${suraName.suraNumber})
            </span>
            &nbsp;|&nbsp;
            <span class="surahTitle">
                ${suraName.arabic}
            </span>
            &nbsp;|&nbsp;
            <span class="ayaTranslationName">
                Translation - ${translation}
            </span>
        </td>
    </tr>
</table>