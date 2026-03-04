package org.example.controller;

import org.example.dao.IFilmsAnalysisDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * @author deLinDe
 * @TimeData 2023/6/30
 * @Description: org.example.controller
 */
@RestController
public class HelloController
{
    //定义数据库访问层的引用对象
    @Autowired(required = false)
    private IFilmsAnalysisDao filmsAnalysisDao;

    @RequestMapping("/hello")
    public String sayHello()
    {
         return "Hello SpringBoot!";
    }

    @RequestMapping("/displayComments")
    public List<Map<String,Object>> displayComments(){
        List<Map<String,Object>> result = filmsAnalysisDao.findComments();
        return result;
    }

    //每年的电影数量
    @RequestMapping("/everyYearTotalFilms")
    public List<Map<String,Object>> everyYearFilms(){
        List<Map<String,Object>> result =
                filmsAnalysisDao.everyYear_total_films();
        return result;
    }

    //不同风格的电影总数
    @RequestMapping("/genre_total_films")
    public List<Map<String,Object>> genreTotalFilms(){
        List<Map<String,Object>> result =
                filmsAnalysisDao.genre_total_films();
        return result;
    }

    //不同演员参与的总电影数
    @RequestMapping("/actor_year_total_films")
    public List<List<Object>> actorYearTotalFilms ()
    {
        List result = new ArrayList<>();
        List<Map<String, Object>> list1 = filmsAnalysisDao.actor_year2020();

        for (Map t : list1) {
            List<Object> temp = new ArrayList<>();
            Object year = t.get("year");
            String actor = (String) t.get("actor");
            Object count = t.get("actor_total_films");
            temp.add(count);
            temp.add(actor);
            temp.add(year);
            result.add(temp);
        }

        List<Map<String, Object>> list2 = filmsAnalysisDao.actor_year2021();
        for (Map t : list2) {
            List<Object> temp = new ArrayList<>();
            Object year = t.get("year");
            String actor = (String) t.get("actor");
            Object count = t.get("actor_total_films");
            temp.add(count);
            temp.add(actor);
            temp.add(year);
            result.add(temp);
        }

        List<Map<String, Object>> list3 = filmsAnalysisDao.actor_year2022();
        for (Map t : list3) {
            List<Object> temp = new ArrayList<>();
            Object year = t.get("year");
            String actor = (String) t.get("actor");
            Object count = t.get("actor_total_films");
            temp.add(count);
            temp.add(actor);
            temp.add(year);
            result.add(temp);
        }

        List<Map<String, Object>> listall = filmsAnalysisDao.actor_total_films();
        for (Map t : listall) {
            List<Object> temp = new ArrayList<>();
            Object year = t.get("year");
            String actor = (String) t.get("actor");
            Object count = t.get("actor_total_films");
            temp.add(count);
            temp.add(actor);
            temp.add(year);
            result.add(temp);
        }
        return result;
    }


    //每年(按年升序排序)对应的每个国家的电影数量
    @RequestMapping("/yearCountrySortFilmsCount")
    public List<List<Object>> yearCountrySortFilmsCount ()
    {
        List result = new ArrayList<>();
        int tow = 1;
        int three = 1;
        List<Map<String, Object>> list = filmsAnalysisDao.everyYear_country_films();
        for (Map t : list) {
            List<Object> temp = new ArrayList<>();
            Object year = t.get("year");
            String country = (String) t.get("country");
            Object count = t.get("count");
            temp.add(count);
            temp.add(tow);
            temp.add(three);
            temp.add(country);
            temp.add(year);
            result.add(temp);
        }
        return result;
    }

    //总的不同类型时长的分布
    @RequestMapping("/duration_avg_vote")
    public List<Map<String,Object>> durationAvgVote ()
    {
        List<Map<String,Object>> result =
                filmsAnalysisDao.duration_avg_vote();
        return result;
    }

    //总的不同类型时长的分布
    @RequestMapping("/country_avg_vote")
    public List<Map<String,Object>> country_avg_vote ()
    {
        List<Map<String,Object>> result =
                filmsAnalysisDao.country_avg_vote();
        return result;
    }

    //每年不同风格的电影数量10-22年
    @RequestMapping("/everyYearGenreTotalFilms")
    public List<List<Object>> everyYearGenreTotalFilms()
    {

        List result=new ArrayList<>();
        List<Integer> times=new ArrayList<>();

        Set genre=new HashSet();
        List genretypes;
        List<Map<String,Object>> list=filmsAnalysisDao.everyYear_genre_total_films();
        //获取所有类型种类
        for (Map t :list) {
            genre.add(t.get("genre"));

        }
        genretypes=new ArrayList(genre);
        //获取时间种类
        for(int i=2010;i<=2022;i++)
        {
            times.add(i);
        }
        result.add(genretypes);
        result.add(times);

        for(Object g:genretypes)//哪种种类
        {
            List<Object> counts=new ArrayList<>();
            for(Object t:times)//哪个时间
            {
                int tag=0;
                for (Map map :list) {
                    if(map.get("genre").equals(g)&&(int)map.get("year")==(int)t)
                    {
                        Object var=map.get("total_genre");
                        counts.add(var);
                        tag=1;
                    }

                }
                if(tag==0)//不存在这条数据
                {
                    counts.add(0);
                }
            }
            result.add(counts);
        }

        System.out.println(result);

        return result;
    }

    //top10 bottom10导演的平均分
    //每年不同风格的电影数量10-22年
    @RequestMapping("/directorAvg")
    public List<List<Object>> directorAvg(){
        List result = new ArrayList<>();
        List<Map<String, Object>> list1 = filmsAnalysisDao.top_director_avg_vote();

        for (Map t : list1) {
            List<Object> temp = new ArrayList<>();
            Object director = t.get("director");
            Object avg = t.get("avg");
            temp.add(director);
            temp.add(avg);
            result.add(temp);
        }

        List<Map<String, Object>> list2 = filmsAnalysisDao.bottom_director_avg_vote();
        for (Map t : list2) {
            List<Object> temp = new ArrayList<>();
            Object director = t.get("director");
            Object avg = t.get("avg");
            temp.add(director);
            temp.add(avg);
            result.add(temp);
        }
        return result;
    }

    //每年电影平均分趋势
    @RequestMapping("/everyYearAvg")
    public  List<Map<String,Object>> everyYearAvg()
        {
            List<Map<String,Object>> result =
                    filmsAnalysisDao.everyYear_avg();
            return result;
        }

    //不同导演拍的总电影数量以及他们的平均分top20
    @RequestMapping("/everyDirectorTotalFilms")
    public  List<Map<String,Object>> everyDirectorTotalFilms()
    {
        List<Map<String,Object>> result =
                filmsAnalysisDao.every_director_total_films();
        return result;
    }
}
