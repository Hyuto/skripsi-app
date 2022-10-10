package com.hyuto.skripsiapp;

import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.Set;

import org.json.JSONObject;

import jsastrawi.morphology.DefaultLemmatizer;
import jsastrawi.morphology.Lemmatizer;

public class Preprocessing extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private static Lemmatizer lemmatizer;
    private static JSONObject emojiData;
    private static Pattern emojiPattern;
    private static JSONObject slangData;
    private static Pattern slangPattern;
    private final Pattern wePattern = Pattern.compile("(?i)\\b\\w*([a-zA-Z])(\\1{1,})\\b");
    private final String urlPattern = (
        "(?i)\\b((?:https?:(?:/{1,3}|[a-z0-9%])|[a-z0-9.\\-]+[.](?:com|net|org|edu|gov|mil|aero|asia|biz|" +
        "cat|coop|info|int|jobs|mobi|museum|name|post|pro|tel|travel|xxx|ac|ad|ae|af|ag|ai|al|am|" +
        "an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|" +
        "ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|" +
        "eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|" +
        "gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|" +
        "kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|" +
        "mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|" +
        "pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|Ja|sk|sl|sm|sn|so|sr|ss|st|" +
        "su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|" +
        "vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)/)(?:[^\\s()<>{}\\[\\]]+|\\([^\\s()]*?\\([^\\" +
        "s()]+\\)[^\\s()]*?\\)|\\([^\\s]+?\\))+(?:\\([^\\s()]*?\\([^\\s()]+\\)[^\\s()]*?\\)|\\([" +
        "^\\s]+?\\)|[^\\s`!()\\[\\]{};:'\\\".,<>?«»“”‘’])|(?:(?<!@)[a-z0-9]+(?:[.\\-][a-z0-9]+)*" +
        "[.](?:com|net|org|edu|gov|mil|aero|asia|biz|cat|coop|info|int|jobs|mobi|museum|name|post" +
        "|pro|tel|travel|xxx|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|" +
        "bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|" +
        "cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|" +
        "gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|" +
        "is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|" +
        "mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|" +
        "np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|" +
        "se|sg|sh|si|sj|Ja|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|" +
        "to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)\\" +
        "b/?(?!@)))");

    @Override
    public String getName() {
        return "Preprocessing";
    }

    Preprocessing(ReactApplicationContext context) throws Exception {
        super(context);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void init(String emojiString, String slangString) {
        Set<String> dictionary = new HashSet<String>();
        InputStream in = Lemmatizer.class.getResourceAsStream("/root-words.txt");
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(in));
            String line;
            while ((line = br.readLine()) != null) {
                dictionary.add(line);
            }
            br.close();
        } catch (Exception e) {
            Log.e("Preprocessing", "Fail to read root-words");
            e.printStackTrace();
        }

        lemmatizer = new DefaultLemmatizer(dictionary);

        try {
            emojiData = new JSONObject(emojiString);
            List<String> emojis = new ArrayList<String>();
            emojiData.keys().forEachRemaining(emojis::add);
            emojis.sort((s1, s2) -> s2.length() - s1.length());
            emojiPattern = Pattern.compile("(" + String.join("|", emojis) + ")", Pattern.UNICODE_CASE);

            slangData = new JSONObject(slangString);
            List<String> slangs = new ArrayList<String>();
            slangData.keys().forEachRemaining(slangs::add);
            slangs.sort((s1, s2) -> s2.length() - s1.length());
            slangPattern = Pattern.compile("(?i)\\b(" + String.join("|", slangs) + ")\\b");
        } catch (Exception e) {
            Log.e("Preprocessing", "Fail to read JSON string");
            e.printStackTrace();
        }
    }

    public String translateEmoji(String text) {
        Matcher matcher = emojiPattern.matcher(text);

        while (matcher.find()) {
            String emoji = matcher.group(1);
            String translate;
            try {
                translate = emojiData.getString(emoji);
                text = text.replaceFirst(emoji, "!" + translate + "!");
            } catch (Exception e) {
                Log.e("Preprocessing", "Fail to get emoji " + emoji);
                e.printStackTrace();
            }
        }

        return text;
    }

    public String replaceWE(String text) {
        Matcher matcher = wePattern.matcher(text);

        while (matcher.find()) {
            String match = matcher.group(0);
            String word = matcher.group(1);
            String replacer = match.replaceAll("([a-zA-Z])(\\1{1,})\\b", word);
            text = text.replaceFirst("\\b" + match + "\\b", replacer);
        }

        return text;
    }

    private static String toRaw(String text) {
        Pattern pattern = Pattern.compile("[\\.\\-\\*]");
        Matcher matcher = pattern.matcher(text);

        while (matcher.find()) {
            String escaped = matcher.group(0);
            text = text.replaceFirst("[\\.\\-\\*]", "\\\\" + escaped);
        }

        return text;
    }

    public String replaceSlang(String text) {
        Matcher matcher = slangPattern.matcher(text);

        while (matcher.find()) {
            String slang = toRaw(matcher.group(1));
            String formal;
            try {
                formal = slangData.getString(slang);
                text = text.replaceFirst("\\b" + slang + "\\b", formal);
            } catch (Exception e) {
                Log.e("Preprocessing", "Fail to get formal word of " + slang);
                e.printStackTrace();
            }
        }

        return text;
    }

    public String stem(String text) {
        List<String> result = new ArrayList<String>();

        for (String token : text.split(" ")) {
            if (token.equals(""))
                continue;
            String stemmed = lemmatizer.lemmatize(token);
            result.add(stemmed);
        }

        return String.join(" ", result);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String run(String text) {
        text = text.toLowerCase(); // lower text
        text = text.replaceAll("[\\s\\u00a0]+", " "); // remove whitespace
        text = translateEmoji(text); // translate emoji
        text = Normalizer.normalize(text, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", ""); // normalize char
        text = text.replaceAll("(?i)<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});", ""); // remove html tag
        text = text.replaceAll(urlPattern, " "); // remove url
        text = replaceWE(text); // replace WE
        text = replaceSlang(text); // replace slang
        text = text.replaceAll("[0-9]", ""); // remove number
        // remove punctuation
        text = text.replaceAll("[!\"#\\$%&'\\(\\)\\*\\+,\\-\\.\\/:;<=>\\?@\\[\\\\\\]\\^_`\\{\\|\\}\\~]", " ");
        text = stem(text); // stemming
        return text;
    }
}
