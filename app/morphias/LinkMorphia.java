package morphias;

import jsons.LinkJson;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

@Entity("links")
public class LinkMorphia {
    @Id
    @SuppressWarnings("unused")
    private ObjectId _id;

    public String destText;
    public int destDocNum;

    @SuppressWarnings("unused")
    private LinkMorphia() {}

    public LinkMorphia(String destText, int destDocNum){
        this.destText = destText;
        this.destDocNum = destDocNum;
    }

    public LinkJson toJson(){
        return new LinkJson(destText,destDocNum);
    }
}
