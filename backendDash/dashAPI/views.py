from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from dashAPI.models import courseRegistration, professorDetails, studentDetails, assignments
from dashAPI.serializers import CourseRegSerializer, profDetSerializer, stuDetSerializer, assgnSerializer

from django.core.files.storage import default_storage

import os

@csrf_exempt
def courseRegApi(request,id=0):
    if request.method == 'GET':
        courseRegs = courseRegistration.objects.all()
        courseRegs_serializer = CourseRegSerializer(courseRegs, many=True)
        return JsonResponse(courseRegs_serializer.data, safe=False)
        

    elif request.method == 'POST':
        courseReg_data = JSONParser().parse(request)
        courseReg_serializer = CourseRegSerializer(data=courseReg_data)
        if courseReg_serializer.is_valid():
            path = "C:\\YASH\\Masters Proj\\Plagiarism-Dashboard\\NodeJS_Dolos\\Files\\Submissions\\"
            path = os.path.join(path, str(courseReg_data['professorId']))
            path = os.path.join(path, courseReg_data['courseId'])
            os.makedirs(path, exist_ok=True)
            courseReg_serializer.save()
            return JsonResponse("Added Successfully !", safe=False)
        return JsonResponse("Failed to Add.", safe=False)

    elif request.method == 'PUT':
        courseReg_data = JSONParser().parse(request)
        courseReg = courseRegistration.objects.get(courseId=courseReg_data['courseId'])
        courseReg_serializer = CourseRegSerializer(courseReg,data=courseReg_data)
        if courseReg_serializer.is_valid():
            courseReg_serializer.save()
            return JsonResponse("Updated Successfully", safe=False) 
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        courseReg_data = JSONParser().parse(request)
        courseReg = courseRegistration.objects.get(courseId=courseReg_data['courseId'])
        courseReg.delete()
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def profDetailsApi(request,id=0):
    if request.method == 'GET':
        proDetails = professorDetails.objects.all()
        proDetails_serializer = profDetSerializer(proDetails, many=True)
        return JsonResponse(proDetails_serializer.data, safe=False)

    elif request.method == 'POST':
        proDet_data = JSONParser().parse(request)
        proDetails_serializer = profDetSerializer(data=proDet_data)
        if proDetails_serializer.is_valid():
            proDetails_serializer.save()
            return JsonResponse("Added Successfully !", safe=False)
        return JsonResponse("Failed to Add.", safe=False)

    elif request.method == 'PUT':
        proDet_data = JSONParser().parse(request)
        proDetails = professorDetails.objects.get(proId=proDet_data['proId'])
        proDetails_serializer = profDetSerializer(proDetails,data=proDet_data)
        if proDetails_serializer.is_valid():
            proDetails_serializer.save()
            return JsonResponse("Updated Successfully", safe=False) 
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        proDet_data = JSONParser().parse(request)
        proDetails = professorDetails.objects.get(proId=proDet_data['proId'])
        proDetails.delete()
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def stuDetailsApi(request,id=0):
    if request.method == 'GET':
        stuDetails = studentDetails.objects.all()
        stuDetails_serializer = stuDetSerializer(stuDetails, many=True)
        return JsonResponse(stuDetails_serializer.data, safe=False)

    elif request.method == 'POST':
        stuDet_data = JSONParser().parse(request)
        stuDetails_serializer = stuDetSerializer(data=stuDet_data)
        if stuDetails_serializer.is_valid():
            stuDetails_serializer.save()
            return JsonResponse("Added Successfully !", safe=False)
        return JsonResponse("Failed to Add.", safe=False)

    elif request.method == 'PUT':
        stuDet_data = JSONParser().parse(request)
        stuDetails = studentDetails.objects.get(index=stuDet_data['index'])
        stuDetails_serializer = stuDetSerializer(stuDetails,data=stuDet_data)
        if stuDetails_serializer.is_valid():
            stuDetails_serializer.save()
            return JsonResponse("Updated Successfully", safe=False) 
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        stuDet_data = JSONParser().parse(request)
        stuDetails = studentDetails.objects.get(index=stuDet_data['index'])
        stuDetails.delete()
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def assgnApi(request,id=0):
    if request.method == 'GET':
        assgnDetails = assignments.objects.all()
        assgnDetails_serializer = assgnSerializer(assgnDetails, many=True)
        return JsonResponse(assgnDetails_serializer.data, safe=False)

    elif request.method == 'POST':
        assgn_data = JSONParser().parse(request)
        assgnDetails_serializer = assgnSerializer(data=assgn_data)
        if assgnDetails_serializer.is_valid():
            path = "C:\\YASH\Masters Proj\\Plagiarism-Dashboard\\NodeJS_Dolos\\Files\\Submissions\\"
            path = os.path.join(path, str(assgn_data['proId']))
            path = os.path.join(path, assgn_data['courseId'])
            path = os.path.join(path, assgn_data['assgnName'] )
            os.mkdir(path)
            assgnDetails_serializer.save()
            return JsonResponse(assgnDetails_serializer.data, safe=False)
        return JsonResponse("Failed to Add.", safe=False)

    elif request.method == 'PUT':
        assgn_data = JSONParser().parse(request)
        assgnDetails = assignments.objects.get(assgnId=assgn_data['assgnId'])
        assgnDetails_serializer = assgnSerializer(assgnDetails,data=assgn_data)
        if assgnDetails_serializer.is_valid():
            assgnDetails_serializer.save()
            return JsonResponse("Updated Successfully", safe=False) 
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method == 'DELETE':
        assgn_data = JSONParser().parse(request)
        assgnDetails = assignments.objects.get(assgnId=assgn_data['assgnId'])
        assgnDetails.delete()
        return JsonResponse("Deleted Successfully", safe=False)

@csrf_exempt
def SaveFile(request):
    file = request.FILES['uploadedFile']
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)


