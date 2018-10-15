import { UuidTextPair } from "./UuidTextPair";
var CurationMap = /** @class */ (function () {
    function CurationMap(documents) {
        this.documents = documents;
        this.setLinkUuidTexts();
        this.calcDetailSvgY();
    }
    CurationMap.prototype.setLinkUuidTexts = function () {
        var _this = this;
        this.documents.forEach(function (doc) {
            if (doc.linkUuidTexts.length == 0) {
                doc.fragments.forEach(function (frag) {
                    frag.links.forEach(function (link) {
                        if (!doc.hasFragTextInLinkUuidTexts(link.uuid)) {
                            doc.linkUuidTexts.push(new UuidTextPair(link.uuid, _this.getTextFromUuid(link.uuid)));
                        }
                    });
                });
            }
        });
    };
    CurationMap.prototype.getTextFromUuid = function (uuid) {
        var ret = "";
        this.documents.forEach(function (doc) {
            if (doc.uuid == uuid) {
                ret = doc.getDocText();
            }
            doc.fragments.forEach(function (frag) {
                if (frag.uuid == uuid) {
                    ret = frag.text;
                }
            });
        });
        return ret;
    };
    CurationMap.prototype.calcDetailSvgY = function () {
        this.documents.forEach(function (doc) {
            doc.calcDetailSvgY();
        });
    };
    return CurationMap;
}());
export { CurationMap };
